# Project Plan and Progress Log

Edit the dates to match your review schedule.

## Milestones
| Phase | Work | Status |
|---|---|---|
| 1. Problem and research | Define users (Anganwadi worker, parent), study WHO standards, ICDS norms | Done (basic) |
| 2. Design | Screens, data model, age bands, language plan | Done |
| 3. Core implementation | Child entry, status logic, diet plan, dashboard, tips, quiz | **Done (MVP)** |
| 4. Testing | Unit tests for logic, manual UI checks | In progress (11 unit tests passing) |
| 5. Improvement | Full WHO tables, height indicators, Kannada, growth chart | Planned |
| 6. Field feedback | Show to an Anganwadi worker, collect feedback | Planned |
| 7. Final delivery | Final report, PPT, demo video, polished repo | Planned |

## Progress log
- **Week 1:** Chose problem scope, set up repository, built core logic and data.
- **Week 2:** Built the UI (add child, dashboard, tips, quiz), English + Hindi, unit tests.

## Challenges and solutions
| Challenge | Solution |
|---|---|
| Full WHO tables are large and easy to get wrong | Used key-age reference values with interpolation, kept them in one data file for easy replacement |
| Workers may have low connectivity | Built a no-server, offline-capable static app with local storage |
| Language barrier | Text kept separate from logic so languages can be added |
| Keeping logic testable | Separated pure logic (`logic.js`) from UI (`app.js`) |

## Next steps
1. Replace approximate WHO values with the official monthly tables.
2. Add height-for-age and weight-for-height.
3. Add a growth chart per child and follow-up reminders.
4. Add Kannada and review translations with a native speaker.
5. Get feedback from an Anganwadi worker and revise.
