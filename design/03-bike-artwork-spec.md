# Bike Artwork Spec (layered SVG)

The dissectable bike needs one SVG per bike type where **every component is its own group**.

## Files
- `assets/bikes/motorcycle.svg`
- `assets/bikes/bicycle.svg`

## Rules
1. Single viewBox, e.g. `0 0 1200 700`, side view, bike facing right.
2. Each component is a `<g id="part-<id>">` using the ids in `docs/02-component-catalogue.md` (example: `part-chain`, `part-front-tyre`).
3. Each group also carries `data-anchor-x` and `data-anchor-y`: its center point in the assembled bike.
4. Flat vector shapes, no embedded raster images, no filters or masks (they break react-native-svg).
5. Parts that are hidden behind others (piston, gearbox) are drawn simplified and still get their own group.
6. Provide fills as one or two flat colors per part so the app can recolor on highlight.

## Where to get it
- Commission on Fiverr or buy a layered vector from Freepik/Envato, then ask the designer to follow rules 1-6 and the catalogue ids.
- While waiting, ask the Copilot agent for a simple placeholder SVG that follows these rules, and swap the real one in later. The code must read parts from the SVG by id so swapping needs no code changes.
