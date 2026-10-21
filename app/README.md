# BikeBuddy

BikeBuddy is an Expo and React Native app that explains bike parts in simple
language and helps riders track care, service bills, fuel, nearby stations,
community tips, and modifications.

## Setup

Requirements:

- Node.js compatible with the installed Expo SDK
- Expo Go on a physical phone, or an Android/iOS development environment
- Network access on first launch so the Inter font can load

Install dependencies:

```bash
cd app
npm install
```

Start the app:

```bash
npx expo start --tunnel
```

Scan the QR code with Expo Go. For a quick browser check, use
`npx expo start --web` after installing the web dependencies required by Expo.

Validation commands:

```bash
npx tsc --noEmit
npx expo export --platform android
```

## Project structure

```text
app/
├── App.tsx
├── assets/
│   └── bikes/                 # Layered placeholder SVG artwork
└── src/
    ├── components/ui/         # Shared accessible design-system components
    ├── data/                  # Local JSON fixtures
    ├── features/
    │   ├── explorer/          # Interactive bike canvas and part sheet
    │   ├── myBike/            # Dashboard, care, service, bill, fuel
    │   ├── community/         # Feed, composer, groups, events, Q&A
    │   ├── stations/          # Nearby station map/list
    │   ├── mods/              # Modification catalogue and wishlist
    │   └── more/              # Secondary feature entry point
    ├── services/              # Async boundaries around mock data
    ├── store/                 # Persisted Zustand stores
    ├── screens/               # Development-only DesignGallery
    ├── theme/                 # Tokens, provider, and theme hook
    └── types/                 # Shared TypeScript domain models
```

## Mock services and backend replacement

Screens do not import fixture JSON directly. They call async functions from
`src/services`, such as `bikeService`, `fuelService`, `communityService`,
`stationService`, and `modService`.

To connect a real backend:

1. Keep the public function signatures in each service stable.
2. Replace the JSON import and function body with an HTTP or SDK request.
3. Map the response into the types in `src/types/models.ts`.
4. Preserve explicit errors so screens can show their retry states.
5. Keep optimistic local changes in Zustand only where the backend mutation
   can be confirmed or rolled back.
6. Replace the mocked `billScanService.analyzeBill` implementation with a
   provider that returns the same `BillAnalysis` shape and confidence data.

AsyncStorage currently persists bikes, tasks, fuel entries, and service
records. Authentication, sync conflict handling, and server-side moderation
are not part of this phase.

## Accessibility and performance notes

- Interactive controls use accessible roles, labels, and selected/disabled
  states.
- Primary controls use the 48px minimum touch target.
- Text allows system font scaling.
- Theme colors come from the shared token palette.
- Explorer parts are memoized and gesture transforms run through Reanimated.
- Community uses `FlatList` with bounded initial rendering and windowing.
- Reduced motion skips explorer camera and part transitions.

## Known limitations

- Bike artwork is a flat placeholder. Replace the SVGs in `assets/bikes/` with
  final artwork while preserving the `part-<id>` group IDs.
- The station map is a themed mock map. Navigation opens a native maps URL, but
  live maps and live location are not connected.
- Bill scanning uses a gallery image picker and mocked analysis; real OCR is out
  of scope.
- Community posts, likes, wishlist changes, and comments are local session
  changes and are not synced.
- The app currently uses a compact custom tab shell rather than the planned
  React Navigation production navigator.
- Settings, account authentication, payments, and backend sync remain future
  work.

## Store publishing checklist

Before publishing to Google Play or the Apple App Store:

- [ ] Replace placeholder app icon, adaptive icon, favicon, and splash artwork.
- [ ] Verify app name, bundle/package identifiers, version, and build numbers.
- [ ] Add final motorcycle and bicycle artwork and confirm all part IDs.
- [ ] Add production API configuration without committing secrets.
- [ ] Implement authentication, account deletion, and data export if accounts
  are introduced.
- [ ] Write and publish a privacy policy covering photos, location,
  notifications, analytics, community posts, and stored bike data.
- [ ] Add clear permission education and denial fallbacks for camera, photos,
  location, and notifications.
- [ ] Add accurate Android and iOS permission text in the Expo configuration.
- [ ] Test notification scheduling across timezone changes and denied
  permissions.
- [ ] Test native maps handoff when no maps app is installed.
- [ ] Verify WCAG contrast, screen-reader labels, keyboard/focus order where
  applicable, font scaling, and reduced motion on both platforms.
- [ ] Test on low-end Android hardware, small screens, large text, and both
  light and dark themes.
- [ ] Test offline, slow network, empty data, malformed service responses, and
  retry states.
- [ ] Add crash reporting, privacy-safe analytics, and a support contact.
- [ ] Moderate community content and add report/block flows before real users
  are enabled.
- [ ] Generate signed Android and iOS builds, install them cleanly, and run a
  release smoke test.
- [ ] Prepare store screenshots, descriptions, age rating, content warnings,
  and regional compliance declarations.
