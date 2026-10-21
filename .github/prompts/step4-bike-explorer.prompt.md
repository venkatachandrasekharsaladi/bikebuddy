---
agent: agent
description: Step 4: the interactive bike explorer (hero feature)
---
Follow #file:.github/copilot-instructions.md and #file:design/03-bike-artwork-spec.md. Match screenshots s01, s02, s03 from #folder:design/screens if present.

STEP 4: BUILD THE INTERACTIVE BIKE EXPLORER IN FULL. Build in this order and make each sub-step work before the next:
A. Render the layered bike SVG from `assets/bikes/*.svg` (if the real file is missing, generate a simple placeholder following the artwork spec). Parts are looked up by `part-<id>`.
B. Assembled screen with a pulsing "Tap to explore" hint and the Motorcycle | Bicycle toggle.
C. Explode animation (700ms spring): each part travels from its anchor to a spread position on a large 2D canvas. Spread positions are data-driven.
D. Pan in any direction, pinch to zoom, double-tap to reset (Gesture Handler + Reanimated), with a mini-map showing the viewport.
E. Tap a part: highlight with orange glow, open the BottomSheet with: name + illustration, What it does, Why it matters, Signs it needs attention (3 bullets), How often to check, Cost range pill, Related parts chips that animate the camera to the related part.
F. "Put it back together" button with a reverse animation.
G. Search bar + category chips that fly the camera to the chosen part.
Handle performance: memoize parts, avoid re-renders during gestures, test with 32 parts.
End with how to test and a list of anything that did not work.
