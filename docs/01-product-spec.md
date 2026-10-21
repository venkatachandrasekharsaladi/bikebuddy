# BikeBuddy Product Spec

## Vision
A mobile app that teaches riders how their bike works in plain language and helps them look after their own bike. A first-time rider must understand everything without technical knowledge.

## Principles
- Plain language, explain like to a 12-year-old, use analogies.
- Visual first, text second.
- Thumb-friendly, 48px minimum tap targets, primary actions in the lower half.
- Light and dark mode, token-based design, accessible (WCAG AA).
- Friendly empty, loading and error states everywhere.

## Navigation
Bottom tabs: Explore | My Bike | Fuel | Community | More (Stations, Modifications, Settings).
My Bike has a floating "+" button: Add fuel, Mark chore done, Add service, Scan bill.

## Feature 1: Interactive Bike Explorer (hero)
1. Home shows one realistic side-view bike (layered SVG), centered, with a pulsing "Tap to explore" hint.
2. Tap: the bike explodes into components with a smooth animation, spread over a 2D canvas.
3. Pan in any direction, pinch to zoom, double-tap to reset. Mini-map in the corner.
4. Tap a part: highlight it and open a bottom sheet with: name + illustration, What it does, Why it matters, Signs it needs attention (3 bullets), How often to check/replace, Cost range (Low/Medium/High), Related parts chips that jump to connected parts.
5. "Put it back together" button reassembles with animation.
6. Search bar + category chips (Engine, Transmission, Brakes, Suspension, Wheels & Tyres, Electrical, Body & Frame) that fly the camera to the part.
7. Toggle Motorcycle / Bicycle (data-driven so more bikes can be added).

## Feature 2: My Bike
Onboarding: brand, model, year, registration (optional), odometer, photo. Multiple bikes with swipeable switcher.
Dashboard: photo, odometer, health score ring, next-due tasks, last service, average km/l, quick actions.

### 2a. Care Checklist
Preloaded recurring tasks: clean chain, lubricate chain, tyre pressure, engine oil level, change engine oil, brake pads, clean air filter, battery, coolant.
Each task: interval by days OR km, last-done, status chip (On time / Due soon / Overdue), swipe "Mark as done", tap for step-by-step "How to do it" with estimated time. Custom tasks, streaks, reminder scheduling UI.

### 2b. Servicing Tracker
- Timeline: date, odometer, centre, total cost, parts changed.
- Smart reminder: "Next service due in X days / Y km".
- Scan Service Bill: capture (edge guides) -> processing animation -> results list (item, plain-English explanation, price, badge Normal / Check this / Possibly unnecessary with a reason) -> total + fair-price comparison -> Save. Detected parts update each component's "last replaced". Bill photo stored with the entry. OCR/AI output is MOCKED behind a service interface.

### 2c. Fuel Log
Add fill-up sheet: litres, price/litre, total (auto), odometer, full-tank toggle, date. Daily reminder (configurable). Stats: km/l line chart, monthly spend bars, cost per km, best/worst fill-up. History with swipe-to-delete and edit.

## Add-ons
- Community: feed (text + photo), likes/comments, groups by brand/city, ride events, Q&A, profiles.
- Nearby Fuel Stations: map/list toggle, name, distance, Open/Closed badge, hours, fuel types, Navigate, filters Open now / 24 hours.
- Modifications: tabs "For my bike" and "Popular for all"; cards with benefit, cost, difficulty, legal/warranty note, wishlist; detail with before/after.

## Out of scope for this phase
Real backend, real OCR, real auth, payments. All data is mocked behind a service layer.
