---
agent: agent
description: Step 3: folder structure, TS models, mock data
---
Follow #file:.github/copilot-instructions.md, #file:docs/01-product-spec.md and #file:docs/02-component-catalogue.md.

STEP 3: DATA LAYER.
1. Create the full folder structure under `app/src`.
2. Define TypeScript models in `src/types`: Bike, BikeComponent, Task, ServiceRecord, BillItem, FuelEntry, Station, Post, Comment, Mod, UserProfile.
3. Create mock JSON in `src/data`: all 32 motorcycle components and 12 bicycle components from the catalogue with complete fields and plain-language copy; default care tasks; 3 sample service records; 20 fuel entries; 8 stations with opening hours; 10 community posts; 12 mods.
4. Create a service layer in `src/services` (bikeService, taskService, serviceRecordService, billScanService with a mocked analyze function that returns flagged items after a 2s delay, fuelService, stationService, communityService, modService) exposing async functions so a real API can replace them.
5. Create Zustand stores with AsyncStorage persistence.
Run type-check and show a summary table of what exists.
