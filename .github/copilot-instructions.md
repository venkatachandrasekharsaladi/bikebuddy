# BikeBuddy: Project Instructions for Copilot

## What we are building
BikeBuddy is a mobile app (React Native + Expo + TypeScript) that teaches bike enthusiasts how every bike component works in plain language and helps them track maintenance, servicing and fuel. Full requirements: `docs/01-product-spec.md`. Parts list: `docs/02-component-catalogue.md`. Design rules: `design/02-design-system.md`.

## Tech stack (do not substitute without asking)
- Expo (managed) + TypeScript (strict)
- React Navigation: bottom tabs + native stack
- react-native-reanimated + react-native-gesture-handler for animation and gestures
- react-native-svg for the interactive bike
- Zustand for state, AsyncStorage for persistence
- expo-notifications, expo-image-picker / expo-camera, react-native-maps
- All data is MOCKED in local JSON behind a service layer (`src/services`) so a backend can replace it later.

## Project structure
```
app/src/
  navigation/   screens/   components/   features/<feature>/
  data/ (mock JSON)   services/   store/   theme/   types/   utils/
```
Feature folders: explorer, myBike, care, service, fuel, community, stations, mods.

## Code rules
1. Complete, runnable code. No placeholders like "// add logic here".
2. Components are small and reusable. No file over ~250 lines.
3. Strict TypeScript. No `any`. Models live in `src/types`.
4. Styling: ONLY tokens from `src/theme/tokens.ts` via `useTheme()`. Never hardcode colors, font sizes or spacing.
5. Screens read data from services/stores, never import JSON directly.
6. Every screen has loading (skeleton), empty and error states.
7. Accessibility: accessibilityLabel/role on touchables, 48px tap targets, respect Reduce Motion, support font scaling.
8. Animations run on the UI thread (Reanimated worklets), target 60fps.
9. Comment only non-obvious logic.
10. Do not add libraries beyond the stack without listing them and the reason first.

## Content rules
All user-facing copy is plain language for a 12-year-old, with simple analogies. No jargon without a brief explanation. Costs shown as Low / Medium / High; money in INR with the rupee symbol unless the user changes it.

## Design rules
Match the screenshots in `design/screens/` when attached. If a screenshot conflicts with the tokens, tell me, then follow the screenshot and propose a token update.

## Workflow rules
- Work one step at a time. Before coding, list assumptions in a few bullets instead of stopping to ask questions.
- After coding, run type-check (`npx tsc --noEmit`) and fix errors.
- Finish every step with: files changed, how to test on a phone, and what remains.
- Never re-create the Expo project; it already exists in `app/`.
