// Run with:  node --test tests/logic.test.js   (or: npm test)
const test = require('node:test');
const assert = require('node:assert');
const L = require('../js/logic.js');

test('ageInMonths counts completed months', () => {
  assert.strictEqual(L.ageInMonths('2023-01-15', '2026-01-14'), 35);
  assert.strictEqual(L.ageInMonths('2023-01-15', '2026-01-15'), 36);
  assert.strictEqual(L.ageInMonths('2026-02-01', '2026-01-01'), null); // future DOB
  assert.strictEqual(L.ageInMonths('not-a-date', '2026-01-01'), null);
});

test('weight-for-age: boy 12 months', () => {
  assert.strictEqual(L.weightForAge('boy', 12, 9.6).status, 'normal');
  assert.strictEqual(L.weightForAge('boy', 12, 7.5).status, 'moderate');
  assert.strictEqual(L.weightForAge('boy', 12, 6.5).status, 'severe');
});

test('weight-for-age: girl 36 months boundaries', () => {
  assert.strictEqual(L.weightForAge('girl', 36, 10.8).status, 'normal'); // exactly -2SD is not below
  assert.strictEqual(L.weightForAge('girl', 36, 10.7).status, 'moderate');
  assert.strictEqual(L.weightForAge('girl', 36, 9.4).status, 'severe');
});

test('interpolation between table ages', () => {
  const [sd3, sd2, med] = L.refAt(require('../js/data.js').WFA.boys, 30);
  assert.ok(med > 12.2 && med < 14.3);
  assert.ok(sd2 > 9.7 && sd2 < 11.3);
  assert.ok(sd3 < sd2 && sd2 < med);
});

test('ages beyond 60 months use the last row (no crash)', () => {
  assert.strictEqual(L.weightForAge('boy', 70, 17).status, 'normal');
});

test('MUAC categories and applicability', () => {
  assert.strictEqual(L.muacStatus(24, 11.4), 'severe');
  assert.strictEqual(L.muacStatus(24, 12.0), 'moderate');
  assert.strictEqual(L.muacStatus(24, 13.0), 'normal');
  assert.strictEqual(L.muacStatus(3, 11.0), null);
  assert.strictEqual(L.muacStatus(24, null), null);
});

test('assess takes the worse of weight and MUAC and flags referral', () => {
  const a = L.assess({ sex: 'boy', months: 24, weight: 12.0, muac: 11.0 });
  assert.strictEqual(a.wfa.status, 'normal');
  assert.strictEqual(a.overall, 'severe');
  assert.strictEqual(a.refer, true);
  const b = L.assess({ sex: 'girl', months: 48, weight: 16, muac: '' });
  assert.strictEqual(b.overall, 'normal');
  assert.strictEqual(b.refer, false);
});

test('bandFor maps ages to feeding bands', () => {
  assert.strictEqual(L.bandFor(0), '0-5');
  assert.strictEqual(L.bandFor(6), '6-11');
  assert.strictEqual(L.bandFor(23), '12-23');
  assert.strictEqual(L.bandFor(35), '24-35');
  assert.strictEqual(L.bandFor(72), '36-72');
  assert.strictEqual(L.bandFor(73), null);
});

test('validate catches bad input', () => {
  assert.deepStrictEqual(L.validate({ name: 'Asha', sex: 'girl', months: 20, weight: 9.5, muac: null }), []);
  const errs = L.validate({ name: ' ', sex: 'x', months: 90, weight: 0.5, muac: 2 });
  ['name', 'age', 'sex', 'weight', 'muac'].forEach((e) => assert.ok(errs.includes(e), e));
});

test('summarize and CSV export', () => {
  const kids = [
    { name: 'A', sex: 'boy', months: 12, weight: 9.6, muac: null, date: '2026-11-05' },
    { name: 'B, "Jr"', sex: 'girl', months: 12, weight: 5.5, muac: null, date: '2026-11-05' }
  ];
  const s = L.summarize(kids);
  assert.deepStrictEqual([s.total, s.normal, s.severe], [2, 1, 1]);
  const csv = L.toCSV(kids).split('\n');
  assert.strictEqual(csv.length, 3);
  assert.ok(csv[2].startsWith('"B, ""Jr"""'));
});

test('every age band has English and Hindi diet content', () => {
  const D = require('../js/data.js');
  ['en', 'hi'].forEach((lang) => D.BANDS.forEach((b) => {
    assert.ok(D.DIET[lang][b.id].points.length >= 4, lang + ' ' + b.id);
  }));
});
