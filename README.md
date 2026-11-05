# Poshan Sathi - Diet and Nutrition Awareness Tool for Anganwadi Children

A simple, offline-friendly web app that helps Anganwadi workers and parents screen the nutrition status of children (0-6 years), get an age-appropriate diet plan, and learn basic nutrition practices - in English and Hindi.

> Status: **Prototype / MVP (midway stage)**. It is a screening and awareness aid, not a medical diagnosis.

## Problem statement
Malnutrition among young children is still common, and Anganwadi workers often track growth on paper with limited tools to turn measurements into clear advice for families. This tool turns a child's age, sex, weight (and optional MUAC) into a simple status, a referral flag for severe cases, and a practical diet plan using locally available foods.

## Features (MVP)
- **Add child:** name, sex, date of birth or age in months, weight, optional MUAC.
- **Nutrition status:** weight-for-age (WHO-based, normal / underweight / severely underweight) and MUAC screening (6-59 months). The worse of the two is the overall status.
- **Referral alert:** severe cases are flagged for PHC / NRC referral with care instructions.
- **Diet plan:** feeding guidance for five age bands (0-5, 6-11, 12-23, 24-35, 36-72 months).
- **Dashboard:** counts by status, list of children, delete, CSV export. Data stays on the device (browser storage).
- **Awareness:** nutrition tips and a short quiz.
- **Languages:** English and Hindi (more can be added in `js/data.js` and `js/app.js`).

## Tech stack
HTML, CSS, vanilla JavaScript (no build step, no server). Unit tests use Node's built-in test runner.

## Project structure
```
poshan-sathi/
├── index.html          # page layout
├── css/style.css       # mobile-first styles
├── js/
│   ├── data.js         # WHO reference values, diet content, tips, quiz (en/hi)
│   ├── logic.js        # pure nutrition logic (age, status, validation, CSV)
│   └── app.js          # UI wiring and translations
├── tests/logic.test.js # unit tests for logic.js
└── docs/
    ├── PROJECT_PLAN.md # timeline, milestones, progress
    └── TESTING.md      # test approach and results
```

## How to run
1. Open `index.html` in any modern browser (double-click, or serve the folder: `python3 -m http.server`).
2. To run the tests (Node 18+): `npm test`

## How it works
1. Age is computed from date of birth (or entered in months).
2. Weight is compared with WHO weight-for-age cut-offs (-3 SD and -2 SD), interpolated between reference ages.
3. MUAC below 11.5 cm = severe, below 12.5 cm = moderate (WHO, 6-59 months).
4. The overall status drives the advice and the referral flag; the age band drives the diet plan.

## Known limitations
- Weight-for-age uses approximate WHO values at key ages with linear interpolation, and uses the 60-month values for ages above 60 months. Replace `WFA` in `js/data.js` with the full official WHO monthly tables before real use.
- Height-based indicators (stunting, wasting) are not yet included.
- Hindi text and diet content should be reviewed by a nutritionist / native speaker; add a regional language such as Kannada.
- Data is stored only in the browser of one device; there is no login or sync.

## Roadmap
See [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md).

## Data sources
- WHO Child Growth Standards (weight-for-age, MUAC-for-screening cut-offs)
- ICDS / Saksham Anganwadi and POSHAN 2.0 supplementary nutrition guidelines (Government of India)
- IYCF (infant and young child feeding) recommendations

## License
MIT
