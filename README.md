# BikeBuddy Starter Kit

Everything needed to design and build the BikeBuddy front end using:

- **Design tool:** Google Stitch (stitch.withgoogle.com), with v0 as fallback
- **Coding agent:** GitHub Copilot **Agent mode** with a custom `BikeBuddy-Frontend` agent in VS Code / Codespaces

## Quick start (10 steps)

1. Create a GitHub repo and open it in a Codespace (or VS Code).
2. Unzip this kit into the repo root (keep the `.github` folder at the root).
3. In the terminal: `npx create-expo-app@latest app --template blank-typescript`
   then move the contents of `src/` from this kit into `app/src/` (see docs/03-setup-and-workflow.md).
4. Open `design/01-stitch-design-brief.md`. Paste the MASTER BRIEF into Stitch, then generate each screen prompt.
5. Export screenshots into `design/screens/` using the names in the handoff checklist.
6. Buy or create the layered bike SVG using `design/03-bike-artwork-spec.md`.
7. In VS Code open Copilot Chat, choose Agent mode, then pick the **BikeBuddy-Frontend** agent.
8. Type `/` and run the prompts in order: step1 ... step7 (files in `.github/prompts/`).
9. After every step: review, test on your phone with `npx expo start --tunnel`, then git commit.
10. Compare the running app with your screenshots and send correction prompts.

See `docs/00-file-overview.md` for what every file does.
