# Testing

## Approach
- **Unit tests** (automated) cover the nutrition logic in `js/logic.js`: age calculation, weight-for-age classification and boundaries, interpolation, MUAC cut-offs, combined assessment, age bands, input validation, summary counts, CSV export, and content completeness for both languages.
- **Manual UI checks** cover the screens in a browser (see checklist).

## Run the unit tests
```
npm test
```

## Preliminary results
- 11 unit tests, 11 passing.
- All scripts pass a Node syntax check.

## Manual test checklist
- [ ] Add a normal child: green status and diet plan shown
- [ ] Add a severely underweight child (e.g. boy, 12 months, 6.5 kg): red status and referral message
- [ ] Add a child with MUAC below 11.5 cm: overall severe even if weight is normal
- [ ] Empty or invalid fields show an error message
- [ ] Date of birth overrides the months field
- [ ] Dashboard counts update; delete and "Delete all" work
- [ ] CSV downloads and opens in a spreadsheet
- [ ] Switching to Hindi updates labels, results and the quiz
- [ ] Layout works at phone width (about 360 px)
- [ ] Records remain after refreshing the page

## Known gaps
- No automated browser (UI) tests yet.
- Reference values are approximate until the official WHO tables are loaded.
