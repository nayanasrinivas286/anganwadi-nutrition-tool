/*
 * logic.js - pure functions (no DOM) so they can be unit tested with Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./data.js'));
  else root.NutriLogic = factory(root.NutriData);
})(typeof self !== 'undefined' ? self : this, function (D) {
  const RANK = { normal: 0, moderate: 1, severe: 2 };

  /** Whole completed months between a date of birth (YYYY-MM-DD) and today. */
  function ageInMonths(dob, today) {
    const b = new Date(dob);
    const t = today ? new Date(today) : new Date();
    if (isNaN(b) || isNaN(t) || b > t) return null;
    let m = (t.getFullYear() - b.getFullYear()) * 12 + (t.getMonth() - b.getMonth());
    if (t.getDate() < b.getDate()) m -= 1;
    return Math.max(m, 0);
  }

  /** Linear interpolation of a [age, -3SD, -2SD, median] table at the given age. */
  function refAt(rows, months) {
    if (months <= rows[0][0]) return rows[0].slice(1);
    const last = rows[rows.length - 1];
    if (months >= last[0]) return last.slice(1); // clamp beyond 60 months
    for (let i = 0; i < rows.length - 1; i++) {
      const a = rows[i], b = rows[i + 1];
      if (months >= a[0] && months <= b[0]) {
        const f = (months - a[0]) / (b[0] - a[0]);
        return [1, 2, 3].map((k) => a[k] + (b[k] - a[k]) * f);
      }
    }
    return last.slice(1);
  }

  /** Weight-for-age category: normal | moderate (underweight) | severe. */
  function weightForAge(sex, months, weightKg) {
    const rows = sex === 'girl' ? D.WFA.girls : D.WFA.boys;
    const [sd3, sd2, median] = refAt(rows, months);
    let status = 'normal';
    if (weightKg < sd3) status = 'severe';
    else if (weightKg < sd2) status = 'moderate';
    return { status, minus3SD: sd3, minus2SD: sd2, median };
  }

  /** MUAC category for 6-59 months, otherwise null (not applicable). */
  function muacStatus(months, cm) {
    if (cm == null || isNaN(cm) || months < 6 || months > 59) return null;
    if (cm < D.MUAC.severe) return 'severe';
    if (cm < D.MUAC.moderate) return 'moderate';
    return 'normal';
  }

  function bandFor(months) {
    const band = D.BANDS.find((b) => months >= b.min && months <= b.max);
    return band ? band.id : null;
  }

  /** Returns a list of error codes (empty list = valid). */
  function validate(c) {
    const errors = [];
    if (!c.name || !String(c.name).trim()) errors.push('name');
    if (c.months == null || isNaN(c.months) || c.months < 0 || c.months > 72) errors.push('age');
    if (c.sex !== 'boy' && c.sex !== 'girl') errors.push('sex');
    if (c.weight == null || isNaN(c.weight) || c.weight < 1.5 || c.weight > 30) errors.push('weight');
    if (c.muac != null && c.muac !== '' && (isNaN(c.muac) || c.muac < 5 || c.muac > 30)) errors.push('muac');
    return errors;
  }

  /** Full assessment of one child. */
  function assess(c) {
    const wfa = weightForAge(c.sex, c.months, c.weight);
    const muac = muacStatus(c.months, c.muac === '' ? null : c.muac);
    const overall = muac && RANK[muac] > RANK[wfa.status] ? muac : wfa.status;
    return { wfa, muac, overall, refer: overall === 'severe', band: bandFor(c.months) };
  }

  /** Count children by overall status. */
  function summarize(children) {
    const s = { total: children.length, normal: 0, moderate: 0, severe: 0 };
    children.forEach((c) => { s[assess(c).overall] += 1; });
    return s;
  }

  function csvCell(v) {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function toCSV(children) {
    const head = ['Name', 'Sex', 'Age (months)', 'Weight (kg)', 'MUAC (cm)', 'Status', 'Date'];
    const rows = children.map((c) => [c.name, c.sex, c.months, c.weight, c.muac, assess(c).overall, c.date]);
    return [head].concat(rows).map((r) => r.map(csvCell).join(',')).join('\n');
  }

  return { ageInMonths, refAt, weightForAge, muacStatus, bandFor, validate, assess, summarize, toCSV };
});
