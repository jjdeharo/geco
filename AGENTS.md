# Repository Guidelines

## Project Structure & Module Organization
GeCo is a small Electron app with a static frontend. The main UI lives in [`index.html`](/home/jjdeharo/Documentos/github/geco/index.html), with application logic in [`main.js`](/home/jjdeharo/Documentos/github/geco/main.js) and i18n strings in [`translations.js`](/home/jjdeharo/Documentos/github/geco/translations.js). Electron entry points are under [`electron/`](/home/jjdeharo/Documentos/github/geco/electron): `main.js` creates the desktop window and `preload.js` exposes safe APIs. Packaging assets belong in [`build/`](/home/jjdeharo/Documentos/github/geco/build), generated installers in [`dist/`](/home/jjdeharo/Documentos/github/geco/dist), and GitHub release automation in [`.github/workflows/release.yml`](/home/jjdeharo/Documentos/github/geco/.github/workflows/release.yml).

## Build, Test, and Development Commands
Use Node.js 18+.

- `npm install`: install Electron and packaging dependencies.
- `npm start`: run the desktop app with the default Electron entry point.
- `npm run dev`: start Electron with `NODE_ENV=development`.
- `npm run pack`: build an unpacked app directory for quick packaging checks.
- `npm run dist`: create distributable installers in `dist/`.
- `npm ci`: preferred in CI and release builds for lockfile-only installs.

## Coding Style & Naming Conventions
Follow the existing plain-JavaScript style: 2-space indentation, semicolons, and `const`/`let` over `var`. Use `camelCase` for variables and functions (`generateTeamsReport`), `UPPER_SNAKE_CASE` for shared constants (`DEFAULT_LANGUAGE`), and descriptive DOM ids that match UI concepts. Keep translation keys grouped by feature, and update all supported languages when adding new UI text. Preserve the current split between frontend logic, Electron shell code, and localized content.

## Testing Guidelines
Run `npm test` (Node built-in runner, files in `tests/*.spec.js`) and also validate changes manually before opening a PR:

- `npm start` or `npm run dev` for desktop flows.
- Open `index.html` in a browser for quick UI checks.
- Re-test imports/exports, grouping modes, incompatibilities, and at least one non-Spanish language after UI or logic changes.

Add tests for engine changes in `tests/` with descriptive filenames, such as `team-engine.spec.js`.

## Commit & Pull Request Guidelines
Recent history follows short conventional prefixes: `feat:`, `fix:`, `chore:`, `build:`, `ci:`, `docs:`. Keep commit subjects imperative and focused on one change. PRs should include a concise summary, manual test notes, linked issues when applicable, and screenshots or screen recordings for visible UI changes. Do not commit generated `dist/` artifacts unless the release workflow explicitly requires them.

## Release & Repo Notes
GitHub Actions builds installers when a GitHub Release is published. Prefer SSH remotes for GitHub operations on this machine, and do not push release or branch changes without Juanjo’s approval.
