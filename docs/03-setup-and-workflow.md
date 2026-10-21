# Setup and Workflow

## 1. Create the Expo project (in the Codespace terminal)
```bash
npx create-expo-app@latest app --template blank-typescript
cd app
mkdir -p src
# copy the kit's src/theme into app/src/theme
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg \
  react-native-screens react-native-safe-area-context expo-notifications expo-image-picker \
  expo-camera react-native-maps @react-native-async-storage/async-storage expo-font
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack zustand
```

## 2. Run it
- Real phone (best): install Expo Go, run `npx expo start --tunnel`, scan the QR code.
- Browser (quick UI check): `npx expo start --web`. Maps and camera will not work on web.

## 3. Routine for every step
1. Select the BikeBuddy-Frontend agent in Copilot Chat (Agent mode).
2. Run the step prompt (`/step4-bike-explorer`), attach the relevant screenshots from `design/screens/`.
3. Review the plan, approve terminal commands you understand.
4. Run the app and test on your phone.
5. Send correction prompts with a screenshot ("card radius too small, spacing too tight").
6. `git add -A && git commit -m "step N done"`.

## 4. If Copilot struggles
- Break the step down: "Build only the pan/zoom canvas first."
- Re-attach `#file:.github/copilot-instructions.md` and `#file:src/theme/tokens.ts`.
- Start a fresh chat per step so old context does not pollute the new one.
