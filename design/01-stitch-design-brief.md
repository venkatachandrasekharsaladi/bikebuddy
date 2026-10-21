# Google Stitch Design Brief

Tool: https://stitch.withgoogle.com (choose **Mobile app**; use the best model offered, e.g. the "Thinking"/Pro option).
Method: paste the MASTER BRIEF once into a new project, then generate each SCREEN PROMPT as a new screen in the same project so the style stays consistent. Generate dark mode first, then ask for the light variant.
Fallback tool if Stitch is unavailable: v0.dev, same prompts.

---

## MASTER BRIEF (paste first)

Design a mobile app called "BikeBuddy" for motorcycle and bicycle enthusiasts. It teaches riders how every part of their bike works in plain, friendly language, and helps them track maintenance, servicing and fuel.

Mood: sporty, clean, friendly, confident. Not technical or intimidating.
Style: dark charcoal background (#0F1115), card surfaces (#1A1D24), vivid orange primary (#FF6B1A), soft white text (#F4F5F7), muted grey secondary text (#9AA1AE). Status colors: green #22C55E, amber #F5B301, red #EF4444, blue #3B82F6.
Text on orange buttons is near-black (#14110F) for contrast.
Typography: Inter. Large bold headings, comfortable body text, generous line height.
Shape: rounded corners (cards 20px, buttons 16px, chips fully rounded). Soft shadows, subtle gradients, thin 1px borders at 8% white.
Layout: thumb-friendly, primary actions in lower half, 48px minimum tap targets, 16px side margins, 8px spacing grid.
Navigation: bottom tab bar with 5 tabs: Explore, My Bike, Fuel, Community, More. Active tab in orange.
Icons: rounded line icons, 2px stroke, consistent set.
Imagery: clean side-view line-art style bike illustration with an orange accent on highlighted parts.
Accessibility: high contrast, large touch targets.

---

## SCREEN PROMPTS (one at a time)

### S1 Explorer: assembled
Explore tab. Large centered side-view motorcycle illustration on a subtle radial glow. Pulsing circular hint "Tap to explore" over the bike. Top: title "Explore your bike" and a segmented toggle Motorcycle | Bicycle. Bottom tab bar visible.

### S2 Explorer: dissected canvas
The same bike exploded into 20+ separate parts floating across a dark dotted-grid canvas, with thin dotted lines linking related parts. Top: search bar and horizontally scrolling category chips (Engine, Transmission, Brakes, Suspension, Wheels & Tyres, Electrical, Body & Frame). Bottom-left: small mini-map. Bottom-right: "Put it back together" button. One part (the chain) highlighted with an orange glow.

### S3 Explorer: component sheet
Same canvas dimmed behind a half-height bottom sheet for "Chain". Sheet contains: part illustration, title, one-line analogy ("A bridge that carries your pedalling power to the wheel"), sections What it does, Why it matters, Signs it needs attention (3 bullets with warning icons), How often to check (chip), Cost (Low/Medium/High pill), and a row of Related parts chips (Sprockets, Gearbox, Rear wheel).

### S4 My Bike dashboard
Hero card with user's bike photo, name "Royal Enfield Classic 350", odometer "12,480 km". Health score ring (82%). Horizontal swipeable bike switcher dots. Cards: Next due (Lubricate chain, in 2 days), Last service (45 days ago), Fuel average (38 km/l). Floating orange "+" button with expanded mini-menu: Add fuel, Mark chore done, Add service, Scan bill.

### S5 Care checklist
List of recurring tasks with icons, interval text ("every 500 km"), and status chips (On time green, Due soon amber, Overdue red). A task row partially swiped right revealing green "Done". Top card showing a 7-day streak with flame icon. Button "Add custom task".

### S6 Task detail: how to do it
"Lubricate chain" with estimated time 10 min, tools needed icons, 5 numbered steps with small illustrations, a "Mark as done" bottom button, reminder row.

### S7 Service history + next service
Header card "Next service in 18 days / 420 km" with progress bar and bell toggle. Below: vertical timeline of past services with date, centre name, odometer, total cost and chips for parts changed. Button "Scan service bill".

### S8 Scan bill results
Top: thumbnail of the bill photo. List of detected line items. Each row: part name, plain-English one-liner, price, and badge: Normal (green), Check this (amber), Possibly unnecessary (red) with a short reason underneath on flagged items. Bottom summary: total, "Typical fair price: ₹X–₹Y", button "Save to history". (Use the rupee symbol.)

### S9 Fuel log
Top stat cards (Avg km/l, Cost per km). Line chart of mileage, bar chart of monthly spend. History list below. Orange "Add fill-up" button. Also show the Add fill-up bottom sheet variant with litres, price per litre, auto total, odometer, full-tank toggle.

### S10 Nearby fuel stations
Map with pins on top half, list in a draggable bottom sheet. Each card: station name, distance, Open (green) / Closed (red) badge, hours "6 AM – 11 PM", fuel type chips, Navigate button. Filter chips: Open now, 24 hours.

### S11 Community
Feed of posts with rider avatar, photo, text, like and comment counts. Top tabs: Feed, Groups, Events, Q&A. Floating "New post" button.

### S12 Modifications
Tabs: For my bike | Popular for all. Cards: mod name, short benefit, cost, difficulty dots, legal/warranty note icon, heart (wishlist) button.

### Light mode pass
After S1-S12, ask: "Create light-mode versions of S1, S3, S4 and S8 using white background (#F6F7F9), white cards, same orange accent, dark text."
