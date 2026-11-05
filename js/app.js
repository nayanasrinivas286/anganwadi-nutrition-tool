/* app.js - UI wiring. All nutrition rules live in logic.js / data.js. */
(function () {
  'use strict';
  const D = window.NutriData;
  const L = window.NutriLogic;
  const KEY = 'poshanSathi.children.v1';
  const LANG_KEY = 'poshanSathi.lang';

  const T = {
    en: {
      appName: 'Poshan Sathi',
      tagline: 'Diet and nutrition awareness tool for Anganwadi children (0-6 years)',
      tabAdd: 'Add child', tabList: 'Dashboard', tabLearn: 'Tips', tabQuiz: 'Quiz',
      lName: "Child's name", lSex: 'Sex', boy: 'Boy', girl: 'Girl',
      lDob: 'Date of birth', lMonths: 'or age in months', lWeight: 'Weight (kg)',
      lMuac: 'MUAC in cm (optional, 6-59 months)', btnCheck: 'Check nutrition status',
      btnCsv: 'Download CSV', btnClear: 'Delete all records',
      hTips: 'Nutrition tips', hGuide: 'Feeding guide by age', hQuiz: 'Awareness quiz',
      disclaimer: 'This is a screening and awareness aid, not a medical diagnosis. Please consult the health worker or doctor for any concern.',
      errName: 'Please enter the name.', errAge: 'Enter a valid date of birth or age (0-72 months).',
      errWeight: 'Enter a valid weight (1.5-30 kg).', errMuac: 'MUAC must be between 5 and 30 cm.',
      status: { normal: 'Normal', moderate: 'Underweight', severe: 'Severely underweight' },
      resHeading: 'Nutrition status', resWfa: 'Weight for age', resMuac: 'MUAC', resNA: 'not applicable',
      resRefer: 'Refer to the health centre / NRC now.', resAdvice: 'What to do',
      resNormalAdvice: 'Growth looks fine. Keep up healthy feeding and weigh every month.',
      resModerateAdvice: 'Give extra energy-rich meals (add ghee/oil, jaggery, groundnut), keep a monthly check, and re-weigh in 2 weeks.',
      resDiet: 'Diet plan for this age', resAge: 'Age', months: 'months',
      sTotal: 'Total', sNormal: 'Normal', sModerate: 'Underweight', sSevere: 'Severe',
      none: 'No records yet.', del: 'Delete', confirmClear: 'Delete all saved records on this device?',
      quizScore: 'Your score', quizAgain: 'Try again', of: 'of'
    },
    hi: {
      appName: 'पोषण साथी',
      tagline: 'आंगनवाड़ी बच्चों (0-6 वर्ष) के लिए आहार एवं पोषण जागरूकता उपकरण',
      tabAdd: 'बच्चा जोड़ें', tabList: 'डैशबोर्ड', tabLearn: 'सुझाव', tabQuiz: 'प्रश्नोत्तरी',
      lName: 'बच्चे का नाम', lSex: 'लिंग', boy: 'लड़का', girl: 'लड़की',
      lDob: 'जन्म तिथि', lMonths: 'या आयु (माह में)', lWeight: 'वज़न (किग्रा)',
      lMuac: 'MUAC सेमी में (वैकल्पिक, 6-59 माह)', btnCheck: 'पोषण स्थिति जाँचें',
      btnCsv: 'CSV डाउनलोड करें', btnClear: 'सभी रिकॉर्ड हटाएँ',
      hTips: 'पोषण सुझाव', hGuide: 'आयु के अनुसार आहार मार्गदर्शिका', hQuiz: 'जागरूकता प्रश्नोत्तरी',
      disclaimer: 'यह केवल स्क्रीनिंग और जागरूकता का साधन है, चिकित्सकीय निदान नहीं। किसी भी चिंता के लिए स्वास्थ्य कार्यकर्ता या डॉक्टर से मिलें।',
      errName: 'कृपया नाम लिखें।', errAge: 'सही जन्म तिथि या आयु (0-72 माह) दर्ज करें।',
      errWeight: 'सही वज़न (1.5-30 किग्रा) दर्ज करें।', errMuac: 'MUAC 5 से 30 सेमी के बीच होना चाहिए।',
      status: { normal: 'सामान्य', moderate: 'कम वज़न', severe: 'अत्यधिक कम वज़न' },
      resHeading: 'पोषण स्थिति', resWfa: 'उम्र के अनुसार वज़न', resMuac: 'MUAC', resNA: 'लागू नहीं',
      resRefer: 'तुरंत स्वास्थ्य केंद्र / NRC भेजें।', resAdvice: 'क्या करें',
      resNormalAdvice: 'वृद्धि ठीक है। पौष्टिक आहार जारी रखें और हर महीने वज़न लें।',
      resModerateAdvice: 'अतिरिक्त ऊर्जा-युक्त भोजन दें (घी/तेल, गुड़, मूँगफली), हर महीने जाँच करें और 2 हफ्ते बाद दोबारा वज़न लें।',
      resDiet: 'इस उम्र के लिए आहार योजना', resAge: 'आयु', months: 'माह',
      sTotal: 'कुल', sNormal: 'सामान्य', sModerate: 'कम वज़न', sSevere: 'गंभीर',
      none: 'अभी कोई रिकॉर्ड नहीं।', del: 'हटाएँ', confirmClear: 'इस डिवाइस पर सभी सहेजे रिकॉर्ड हटाएँ?',
      quizScore: 'आपका स्कोर', quizAgain: 'फिर से करें', of: 'में से'
    }
  };

  let lang = 'en';
  try { lang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* ignore */ }
  const $ = (id) => document.getElementById(id);
  const t = () => T[lang];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ }
  }
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- static text ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((n) => {
      const v = t()[n.getAttribute('data-i18n')];
      if (typeof v === 'string') n.textContent = v;
    });
    $('lang').value = lang;
    renderTips(); renderGuide(); renderList(); renderQuiz();
    const r = $('result');
    if (!r.hidden && r._child) showResult(r._child);
  }

  /* ---------- tabs ---------- */
  function showTab(name) {
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.panel').forEach((p) => { p.hidden = p.id !== 'tab-' + name; });
    if (name === 'list') renderList();
  }

  /* ---------- result ---------- */
  function addList(parent, items) {
    const ul = el('ul');
    items.forEach((s) => ul.appendChild(el('li', null, s)));
    parent.appendChild(ul);
  }

  function showResult(c) {
    const a = L.assess(c);
    const box = $('result');
    box._child = c;
    box.hidden = false;
    box.className = 'result ' + a.overall;
    box.textContent = '';

    const h = el('h2', null, c.name + ' - ');
    h.appendChild(el('span', 'badge ' + a.overall, t().status[a.overall]));
    box.appendChild(h);
    box.appendChild(el('p', null, t().resAge + ': ' + c.months + ' ' + t().months + ' | ' + c.weight + ' kg'));
    box.appendChild(el('p', null, t().resWfa + ': ' + t().status[a.wfa.status]));
    box.appendChild(el('p', null, t().resMuac + ': ' + (a.muac ? t().status[a.muac] : t().resNA)));
    if (a.refer) box.appendChild(el('p', 'refer', t().resRefer));

    box.appendChild(el('h3', null, t().resAdvice));
    if (a.overall === 'severe') addList(box, D.SEVERE_CARE[lang]);
    else box.appendChild(el('p', null, a.overall === 'moderate' ? t().resModerateAdvice : t().resNormalAdvice));

    const diet = D.DIET[lang][a.band];
    box.appendChild(el('h3', null, t().resDiet + ' - ' + diet.title));
    addList(box, diet.points);
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const dob = $('dob').value;
    let months = $('months').value === '' ? null : Number($('months').value);
    if (dob) months = L.ageInMonths(dob);
    const muacRaw = $('muac').value;
    const child = {
      id: Date.now(),
      name: $('name').value.trim(),
      sex: document.querySelector('input[name=sex]:checked').value,
      months: months,
      weight: $('weight').value === '' ? null : Number($('weight').value),
      muac: muacRaw === '' ? null : Number(muacRaw),
      date: new Date().toISOString().slice(0, 10)
    };
    const errs = L.validate(child);
    const map = { name: 'errName', age: 'errAge', sex: 'errAge', weight: 'errWeight', muac: 'errMuac' };
    $('formError').textContent = errs.length ? t()[map[errs[0]]] : '';
    if (errs.length) return;
    const list = load();
    list.push(child);
    save(list);
    showResult(child);
  }

  /* ---------- dashboard ---------- */
  function renderList() {
    const list = load();
    const s = L.summarize(list);
    const sum = $('summary');
    sum.textContent = '';
    [['', 'total', 'sTotal'], ['', 'normal', 'sNormal'], ['moderate', 'moderate', 'sModerate'], ['severe', 'severe', 'sSevere']]
      .forEach(([cls, key, label]) => {
        const d = el('div', 'stat ' + cls);
        d.appendChild(el('b', null, String(s[key])));
        d.appendChild(el('span', null, t()[label]));
        sum.appendChild(d);
      });

    const box = $('childList');
    box.textContent = '';
    if (!list.length) { box.appendChild(el('p', 'empty', t().none)); return; }
    list.slice().reverse().forEach((c) => {
      const a = L.assess(c);
      const row = el('div', 'child');
      const left = el('div');
      left.appendChild(el('strong', null, c.name + ' '));
      left.appendChild(el('span', 'badge ' + a.overall, t().status[a.overall]));
      left.appendChild(el('div', 'meta', c.months + ' ' + t().months + ' | ' + c.weight + ' kg | ' + c.date));
      const del = el('button', null, t().del);
      del.addEventListener('click', () => { save(load().filter((x) => x.id !== c.id)); renderList(); });
      row.appendChild(left);
      row.appendChild(del);
      box.appendChild(row);
    });
  }

  function downloadCsv() {
    const blob = new Blob([L.toCSV(load())], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'poshan-sathi-records.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ---------- tips, guide, quiz ---------- */
  function renderTips() {
    const ul = $('tipList');
    ul.textContent = '';
    D.TIPS[lang].forEach((s) => ul.appendChild(el('li', null, s)));
  }
  function renderGuide() {
    const g = $('guide');
    g.textContent = '';
    D.BANDS.forEach((b) => {
      const d = D.DIET[lang][b.id];
      const det = el('details');
      det.appendChild(el('summary', null, d.title));
      addList(det, d.points);
      g.appendChild(det);
    });
  }
  function renderQuiz() {
    const box = $('quizBox');
    box.textContent = '';
    const qs = D.QUIZ[lang];
    let score = 0, answered = 0;
    const scoreEl = el('p');
    qs.forEach((q) => {
      const wrap = el('div', 'q');
      wrap.appendChild(el('strong', null, q.q));
      const btns = [];
      q.o.forEach((opt, i) => {
        const b = el('button', null, opt);
        b.addEventListener('click', () => {
          if (btns.some((x) => x.disabled)) return;
          btns.forEach((x) => { x.disabled = true; });
          b.classList.add(i === q.a ? 'right' : 'wrong');
          btns[q.a].classList.add('right');
          if (i === q.a) score += 1;
          answered += 1;
          if (answered === qs.length) scoreEl.textContent = t().quizScore + ': ' + score + ' ' + t().of + ' ' + qs.length;
        });
        btns.push(b);
        wrap.appendChild(b);
      });
      box.appendChild(wrap);
    });
    box.appendChild(scoreEl);
    const again = el('button', null, t().quizAgain);
    again.addEventListener('click', renderQuiz);
    box.appendChild(again);
  }

  /* ---------- init ---------- */
  document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
  $('childForm').addEventListener('submit', onSubmit);
  $('btnCsv').addEventListener('click', downloadCsv);
  $('btnClear').addEventListener('click', () => {
    if (confirm(t().confirmClear)) { save([]); renderList(); }
  });
  $('lang').addEventListener('change', (e) => {
    lang = e.target.value;
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) { /* ignore */ }
    applyLang();
  });
  applyLang();
})();
