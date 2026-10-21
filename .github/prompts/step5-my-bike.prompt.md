---
agent: agent
description: Step 5: My Bike, care checklist, service tracker, bill scanner, fuel log
---
Follow #file:.github/copilot-instructions.md and #file:docs/01-product-spec.md (Feature 2). Match screenshots s04 to s09 from #folder:design/screens if present.

STEP 5: Build in this order, type-checking after each:
1. Add-bike onboarding and multi-bike swipeable switcher.
2. My Bike dashboard (health score ring, next-due, last service, avg km/l, FAB speed dial).
3. Care Checklist: status chips computed from days/km, swipe-to-done with animation and haptic, streak card, task detail "How to do it", custom tasks, reminder picker with expo-notifications local scheduling.
4. Service Tracker: timeline, next-service smart reminder, add service form.
5. Scan Service Bill: capture screen with edge guides (expo-camera/image-picker), processing animation, results screen using the mocked billScanService (badges Normal / Check this / Possibly unnecessary with reasons), totals + fair-price range, Save to history, and update each detected component's last-replaced data.
6. Fuel Log: add fill-up sheet with auto total, daily reminder setting, stats screen with line and bar charts (use react-native-svg, no heavy chart library), history with swipe-to-delete and edit.
Show how to test each on a phone.
