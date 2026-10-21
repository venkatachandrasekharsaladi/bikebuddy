# Design Handoff Checklist

Export from Stitch and save in `design/screens/` with these names:

- [ ] s01-explorer-assembled-dark.png
- [ ] s02-explorer-dissected-dark.png
- [ ] s03-component-sheet-dark.png
- [ ] s04-my-bike-dashboard-dark.png
- [ ] s05-care-checklist-dark.png
- [ ] s06-task-detail-dark.png
- [ ] s07-service-history-dark.png
- [ ] s08-bill-results-dark.png
- [ ] s09-fuel-log-dark.png
- [ ] s10-stations-dark.png
- [ ] s11-community-dark.png
- [ ] s12-modifications-dark.png
- [ ] s01, s03, s04, s08 light variants (suffix -light)

Before coding, confirm:
- [ ] Final hex values in the screenshots match `src/theme/tokens.ts` (update the tokens if you changed the look in Stitch).
- [ ] Bike artwork follows `design/03-bike-artwork-spec.md`, or a placeholder is approved.
- [ ] App name and logo decided.
- [ ] Optional: export to Figma from Stitch for later tweaks.

When prompting Copilot, attach the screenshot and say:
"Build this screen to match the image as closely as possible. Use only tokens from #file:src/theme/tokens.ts."
