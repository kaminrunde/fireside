# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fireside is a visual page/layout editor that integrates with CMS systems (Contentful) and frontend frameworks (Gatsby, Next.js). It provides a grid-based editing interface with a plugin system for extensibility, plus a Storybook addon for component development.

## Monorepo Structure

Lerna monorepo with Yarn, workspaces in `packages/*` and `examples/*`.

**Core packages:**
- `fireside-app` — Main React app (grid editor UI). React 16, Redux, Webpack 4, TypeScript 3.7
- `fireside-utils` — Shared types, plugin creation API, story/component preprocessing
- `storybook-addon-fireside` — Storybook 8 addon for visual editing in Storybook
- `gatsby-plugin-fireside` — Gatsby source plugin integration
- `fireside-connector-contentful` — Contentful CMS connector
- `fireside-plugin-*` — Feature plugins (ab-test, background-rows, copy-component, fullwidth-components)

**Examples:** `examples/example-project-fireside` (Gatsby v2), `examples/gatsby-v4-test`, `examples/nextjs`

## Common Commands

```bash
# Setup — NOTE: comment out registry=... in .npmrc before bootstrap, comment back after
yarn bootstrap                    # Lerna bootstrap (link local packages)

# Development
yarn start:app                    # Start fireside-app dev server (webpack)
yarn start:example                # Start example-project-fireside
yarn start:storybook              # Start Storybook for example project
yarn watch                        # Watch all packages (tsc --watch for libraries)

# Building
yarn build:fireside               # Build fireside in example project

# In individual library packages (fireside-utils, plugins, connector):
npm run build                     # tsc --declaration
npm run type-check                # tsc --noEmit

# Testing (fireside-app only — other packages have no test suites)
cd packages/fireside-app && npm test         # Jest (jsdom)
cd packages/fireside-app && npm run test-types  # TypeScript type check

# Publishing
yarn prerelease                   # lerna publish prerelease
yarn release                      # prepare + lerna publish --exact
```

## Architecture

### Redux State (fireside-app)

State managed via Redux with `redux-ruleset` for side effects and `redux-first-history` for routing. Modules in `src/modules/`:
- `grid` — Layout/grid state (react-grid-layout)
- `connector` — CMS connector state
- `components` — Component definitions
- `plugins` — Plugin state
- `ui`, `settings`, `modal`, `snackbar` — UI state

Business logic lives in `src/features/` as redux-ruleset rules (e.g., `validateComponentAdd`, `ensureCanDelete`, `setConnector`).

### Routes (fireside-app)

Uses `@reach/router`: `/` (index), `/grid/:mediaSize` (grid editor), `/settings`

### Plugin System (fireside-utils)

Plugins are created via `createPlugin()` from `fireside-utils`. Extension points:
- `extendComponent` — Component-level features (badges, icons, settings)
- `extendGridRow` — Row-level features
- `extendComponentButtonList` — Custom buttons
- `extendSettingsPage` — Settings UI additions
- `createStaticComponent` / `createPageNavigation` — Custom components and navigation
- `onStoryUpdate` — React to story changes

Plugins receive a `PluginAPI<State>` context with `state`, `setState`, `story` and available actions (`alert`, `addComponentToComponentList`, `triggerSnackbarEvent`, `updateStory`).

### Styling

Styled-components throughout. The app uses `styled-components@5` while the storybook addon uses `@6`.

### Config

`dev-fireside-config.json` in fireside-app configures storybook URL, default story, media sizes (XS/SM/MD/LG/XL with breakpoints), connector settings, and plugin array.

## Publishing

Packages publish to GitHub Packages (`https://npm.pkg.github.com`) under `@kaminrunde` scope. Requires GitHub personal access token with `repo` + `write:packages` scopes. Only `master` branch can publish.
