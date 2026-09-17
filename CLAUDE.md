# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # run desktop app (NODE_ENV=development; no auto-reload, refresh manually)
npm test           # run tests (Node built-in runner)
npm run pack       # build unpacked app for quick packaging checks
npm run dist       # build distributable installers (output in dist/)
```

To run a single test file: `node --test tests/team-engine.spec.js`

## Architecture

GeCo is an **Electron desktop app** for educators to generate cooperative student teams. No framework, no bundler — plain JS files served directly.

### Core files

| File | Role |
|---|---|
| `main.js` | UI orchestration: i18n, state, DOM events, import/export, localStorage |
| `team-engine.js` | Pure team generation algorithm (UMD, no DOM dependency) |
| `report-engine.js` | Team validation and report criteria (UMD, no DOM dependency) |
| `translations.js` | All UI strings for 5 languages (es, ca, gl, eu, en) |
| `analytics.js` | Privacy-preserving usage tracking (no cookies, no IP) |
| `electron/main.js` | Electron process: window, menus, IPC handlers |
| `electron/preload.js` | Context isolation bridge — exposes `window.gecoAPI` |

### Data flow

1. User types names into three textareas (`grupoA`, `grupoB`, `grupoC` — typologies A/B/C)
2. `updateAssignmentsFromTextareas()` normalizes input into `studentAssignments: [{nombre, tipo}]`
3. On generate: `generarYMostrarEquipos()` → `teamEngine.generateTeams(options)` → renders table
4. `reportEngine.analyzeTeams()` validates the result and renders the report
5. Every state change calls `saveAppState()` → single localStorage key `gecoStateV1`

### State (module-level globals in `main.js`)

- `studentAssignments` — normalized array of `{nombre, tipo}`
- `incompatibleGroups` — array of arrays of incompatible name strings
- `lastReportData` — cached last generation result
- `currentLanguage` — active language code

### UMD pattern in engines

Both `team-engine.js` and `report-engine.js` use UMD so they run in both browser and Node.js (for tests). The engines accept an optional `random` function for deterministic test output.

### i18n

- `t('dotted.key')` resolves nested keys in `TRANSLATIONS`
- Supports `{placeholder}` substitution
- Language stored in localStorage; auto-detected from browser on first load
- `electron/main.js` builds language-aware menus via IPC (`geco:set-language`)

### Team generation modes (see `restricciones.md` for full rules)

- `heterogeneos` — balanced A/B/C across teams
- `homogeneos` — same typology per team
- `esporadicos` — no typology constraint, random

Leftover strategies: `agregar` (add to existing teams) or `grupoNuevo` (form a new smaller team).

### Incompatibilities

Stored as name groups; enforced during generation; auto-cleaned when students are removed; validated in the report.

### CSV export

Uses `;` as separator (not `,`), all values quoted. Team name only in first row of each team block.

### No linting configured

No ESLint or Prettier. No build step in development.
