# Design System

All values live in `src/theme/tokens.ts`. Never hardcode colors, sizes or fonts in components.

## Color
| Token | Dark | Light |
|---|---|---|
| background | #0F1115 | #F6F7F9 |
| surface | #1A1D24 | #FFFFFF |
| surfaceAlt | #232733 | #EEF0F4 |
| border | rgba(255,255,255,0.08) | rgba(0,0,0,0.08) |
| text | #F4F5F7 | #14161A |
| textMuted | #9AA1AE | #5B6372 |
| primary | #FF6B1A | #E85A0C |
| onPrimary | #14110F | #14110F |
| success | #22C55E | #16A34A |
| warning | #F5B301 | #B45309 |
| danger | #EF4444 | #DC2626 |
| info | #3B82F6 | #2563EB |

Rule: text on primary is always `onPrimary` (near-black). White on orange fails AA contrast.

## Typography (Inter)
display 32/40 bold, h1 26/32 bold, h2 20/28 semibold, h3 17/24 semibold, body 16/24 regular, small 14/20 regular, caption 12/16 medium.

## Spacing and shape
Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48. Radius: chip 999, button 16, card 20, sheet 28. Minimum tap target 48.

## Core components
Button (primary, secondary, ghost, destructive; sizes md/lg), Card, Chip (selectable + status), BottomSheet (draggable, snap points 40%/90%), Input (label, helper, error), SegmentedToggle, ProgressRing, StatusBadge (on-time, due-soon, overdue, normal, check, unnecessary), ListRow, EmptyState, Skeleton, Toast, FAB with speed-dial.

## Icons
Rounded line icons, 2px stroke, 24px default. Use one library only (lucide-react-native or @expo/vector-icons Feather).

## Motion
- Durations: micro 150ms, standard 250ms, emphasis 400ms, explode/assemble 700ms.
- Easing: ease-out for entrances, spring (damping 15, stiffness 150) for sheets and the explode animation.
- Always honor "Reduce motion": replace animations with simple fades.
- Mark-as-done: row slides, check icon scales with a light haptic.

## Tone of voice
Friendly, short sentences, no jargon. If a technical word is unavoidable, explain it in brackets the first time.
