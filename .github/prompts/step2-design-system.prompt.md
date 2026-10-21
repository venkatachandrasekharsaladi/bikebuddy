---
agent: agent
description: Step 2: build the design system in code
---
Follow #file:.github/copilot-instructions.md, #file:design/02-design-system.md and #file:src/theme/tokens.ts.

STEP 2: DESIGN SYSTEM. In `app/src/components/ui/` build, with TypeScript and full accessibility: Button (primary/secondary/ghost/destructive, md/lg, loading), Card, Chip (selectable), StatusBadge, SegmentedToggle, Input, ProgressRing, ListRow, EmptyState, Skeleton, Toast, BottomSheet (draggable with snap points 40%/90% using Reanimated + Gesture Handler), FloatingActionMenu (speed dial).
Load Inter via expo-font. Wrap the app with a theme provider that follows system dark/light.
Create a hidden `DesignGallery` screen showing every component in both themes so I can review them. If screenshots exist in #folder:design/screens, make the components match them.
