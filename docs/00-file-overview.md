# File Overview

```
bikebuddy-kit/
├── README.md                              Quick start
├── .github/
│   ├── copilot-instructions.md            Always-on rules Copilot reads in every chat
│   ├── agents/
│   │   └── bikebuddy-frontend.agent.md    The custom coding agent (persona + workflow)
│   └── prompts/
│       ├── step1-product-plan.prompt.md   Run with /step1-product-plan
│       ├── step2-design-system.prompt.md
│       ├── step3-data-models.prompt.md
│       ├── step4-bike-explorer.prompt.md  Hero feature
│       ├── step5-my-bike.prompt.md        Care checklist, service + bill scan, fuel
│       ├── step6-addons.prompt.md         Community, stations, mods
│       └── step7-polish.prompt.md
├── docs/
│   ├── 00-file-overview.md                This file
│   ├── 01-product-spec.md                 Full product requirements (source of truth)
│   ├── 02-component-catalogue.md          The 32 bike parts and their plain-language seeds
│   └── 03-setup-and-workflow.md           Commands, testing, git routine
├── design/
│   ├── 01-stitch-design-brief.md          Master brief + one prompt per screen for Stitch
│   ├── 02-design-system.md                Colors, type, spacing, components, motion
│   ├── 03-bike-artwork-spec.md            Layer names and rules for the bike SVG
│   ├── 04-design-handoff-checklist.md     What to export and how to name it
│   └── screens/                           Put Stitch screenshots here
└── src/theme/
    ├── tokens.ts                          Design tokens (light + dark)
    └── useTheme.ts                        Hook to read the active theme
```

## Who reads what
| File | Read by | When |
|---|---|---|
| copilot-instructions.md | Copilot automatically | Every chat |
| bikebuddy-frontend.agent.md | You select it | Whenever coding |
| prompts/*.prompt.md | You run them with `/` | One per build step |
| docs/*.md, design/*.md | Agent, on request via `#file` | When a step needs detail |
| design/screens/*.png | Agent, attached as images | When building each screen |
