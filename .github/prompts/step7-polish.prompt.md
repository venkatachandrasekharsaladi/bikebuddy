---
agent: agent
description: Step 7: polish, accessibility, README
---
Follow #file:.github/copilot-instructions.md.

STEP 7: POLISH.
1. Audit every screen for loading, empty and error states and add any missing.
2. Verify dark and light mode on all screens; fix contrast issues (WCAG AA).
3. Accessibility pass: labels, roles, focus order, tap targets, font scaling, Reduce Motion fallbacks.
4. Performance pass on the Explorer and long lists (memoization, FlatList tuning).
5. Add haptics and small micro-animations where they improve feel, without overdoing it.
6. Write `app/README.md` with setup, run, project structure, how to swap mock services for a real backend, and known limitations.
7. Produce a checklist of what must be done before publishing to the stores (icons, splash, permissions text, privacy policy).
