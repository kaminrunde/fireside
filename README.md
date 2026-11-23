# fireside
WIP

[![Publish](https://github.com/kaminrunde/fireside/actions/workflows/publish.yml/badge.svg)](https://github.com/kaminrunde/fireside/actions/workflows/publish.yml)

## Packages

All packages are published **publicly on [npmjs.com](https://www.npmjs.com/org/kaminrunde)** (and mirrored to GitHub Packages).

| Package | npm |
| --- | --- |
| `@kaminrunde/fireside-app` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-app)](https://www.npmjs.com/package/@kaminrunde/fireside-app) |
| `@kaminrunde/fireside-utils` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-utils)](https://www.npmjs.com/package/@kaminrunde/fireside-utils) |
| `@kaminrunde/gatsby-plugin-fireside` | [![npm](https://img.shields.io/npm/v/@kaminrunde/gatsby-plugin-fireside)](https://www.npmjs.com/package/@kaminrunde/gatsby-plugin-fireside) |
| `@kaminrunde/storybook-addon-fireside` | [![npm](https://img.shields.io/npm/v/@kaminrunde/storybook-addon-fireside)](https://www.npmjs.com/package/@kaminrunde/storybook-addon-fireside) |
| `@kaminrunde/fireside-connector-contentful` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-connector-contentful)](https://www.npmjs.com/package/@kaminrunde/fireside-connector-contentful) |
| `@kaminrunde/fireside-plugin-ab-test` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-plugin-ab-test)](https://www.npmjs.com/package/@kaminrunde/fireside-plugin-ab-test) |
| `@kaminrunde/fireside-plugin-background-rows` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-plugin-background-rows)](https://www.npmjs.com/package/@kaminrunde/fireside-plugin-background-rows) |
| `@kaminrunde/fireside-plugin-copy-component` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-plugin-copy-component)](https://www.npmjs.com/package/@kaminrunde/fireside-plugin-copy-component) |
| `@kaminrunde/fireside-plugin-fullwidth-components` | [![npm](https://img.shields.io/npm/v/@kaminrunde/fireside-plugin-fullwidth-components)](https://www.npmjs.com/package/@kaminrunde/fireside-plugin-fullwidth-components) |

## Usage

No token and no `.npmrc` configuration needed:

```bash
npm install --save \
  @kaminrunde/fireside-app \
  @kaminrunde/fireside-utils \
  @kaminrunde/gatsby-plugin-fireside \
  @kaminrunde/storybook-addon-fireside
```

### Migrating from GitHub Packages

Older setups installed these packages from GitHub Packages and needed a GitHub token plus this line in the project's `.npmrc`:

```
@kaminrunde:registry=https://npm.pkg.github.com
```

Remove that line (and the token) to install from npmjs.com instead.

> **Note:** a registry mapping in `.npmrc` applies to the whole `@kaminrunde` scope. If your project also uses other `@kaminrunde/*` packages that exist **only** on GitHub Packages, keep the line – the fireside packages are still mirrored there, so both setups keep working.

## Lerna

Usage:

```bash
# bootstrap
lerna bootstrap --force-local
```

To publish packages with a scope (e.g., `@kaminrunde/rocks`) publicly, `access` must be set in the packages' `package.json` (all fireside packages already have it):

```
  "publishConfig": {
    "access": "public"
  }
```

## Releasing

Publishing happens **only in CI** via [`.github/workflows/publish.yml`](.github/workflows/publish.yml). Nobody needs an npm or GitHub token locally, and there are no secrets in this repository or in the GitHub repository settings:

- **npmjs.com** – [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC). Packages are published with [provenance](https://docs.npmjs.com/generating-provenance-statements).
- **GitHub Packages** – the workflow's automatic `GITHUB_TOKEN`.

### Release flow

The committed `lib/` folders are published as they are – build (`yarn build` in the package) and commit them before releasing. `fireside-app` is published as source and built in the consuming project (`fireside-build`).

```bash
# stable release: bump versions, commit, tag and push
yarn release

# prerelease (e.g. 1.1.1-alpha.55)
yarn prerelease
```

Pushing the version tag triggers the **Publish** workflow. It publishes every non-private package in `packages/*` whose version is not yet in the target registry, so re-running it is safe.

Prereleases (`x.y.z-alpha.n`) are published with dist-tag **`latest`**, because fireside currently only ships alpha versions (same as on GitHub Packages before). To publish them as `next` instead, set `PRERELEASE_DIST_TAG: next` in the workflow.

### Choosing the target registry

| Where | How |
| --- | --- |
| Default for tag pushes | repository variable `PUBLISH_TARGET` (*Settings → Secrets and variables → Actions → Variables*): `npm`, `github` or `both`. Unset = `both`. |
| Manual run | *Actions → Publish → Run workflow* and pick `both`, `npm` or `github` |

### One-time setup on npmjs.com

npm Trusted Publishing can only be configured for packages that already exist, so the very first version is published once by hand. Run these steps in a real terminal – npm waits there for the browser 2FA confirmation (without a TTY it fails with `EOTP`):

1. Log in (browser login with 2FA; the session token stays in your `~/.npmrc`, never in this repo):
   ```bash
   npm login
   ```
2. Publish the current versions (dry run first):
   ```bash
   scripts/publish-packages.sh npm --dry-run
   scripts/publish-packages.sh npm
   ```
   If npm answers with a *staged publish*, approve the versions on npmjs.com.
3. Configure Trusted Publishing for all packages (`npm trust`, needs npm ≥ 11.10 and 2FA on your account):
   ```bash
   scripts/setup-trusted-publishing.sh --dry-run
   scripts/setup-trusted-publishing.sh        # 2FA in the browser: tick "skip 2FA for 5 minutes"
   scripts/setup-trusted-publishing.sh --list # verify
   ```
   With an authenticator app you can pass a code instead: `NPM_OTP=123456 scripts/setup-trusted-publishing.sh`.
4. Recommended: for each package set *Publishing access* to **"Require two-factor authentication and disallow tokens"** – then only the workflow can publish.
5. `npm logout`

`scripts/publish-packages.sh` also overrides `@kaminrunde:registry`, so a GitHub scope mapping in your personal `~/.npmrc` does not redirect the publish to GitHub Packages.

### Forced release

```bash
# bump all packages even if unchanged
yarn lerna version prerelease --force-publish '*'
```
