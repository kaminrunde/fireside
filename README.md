# fireside
WIP

## Lerna

Usage:

```bash
# bootstrap
# !!! NOTE comment out registry=... in .npmrc
lerna bootstrap --force-local
# !!! NOTE comment in registry=... in .npmrc
```

Add `"private": true` to package's `package.json` for package to remain private.

To publish packages with a scope (e.g., `@kaminrunde/rocks`), [you must set `access`](https://github.com/lerna/lerna/tree/master/commands/publish#per-package-configuration) in packages' `package.json`: 

```
  "publishConfig": {
    "access": "public"
  }
```

Lerna copies root license (`LICENSE`) into package location, no need to do this manually (of via symlink for that matter).

## Configuring npm for use with GitHub Packages

<https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages>

<https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line>

> To authenticate by logging in to npm, use the npm login command, replacing USERNAME with your GitHub username, TOKEN with your [personal access token](https://github.com/settings/tokens), and PUBLIC-EMAIL-ADDRESS with your email address.

```bash
npm login --registry=https://npm.pkg.github.com --scope=@kaminrunde
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

Publishing a package using a local `.npmrc` file

<https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#publishing-a-package-using-a-local-npmrc-file>

### manual prerelease `lerna publish prerelease`

```bash
❯ yarn run prerelease
yarn run v1.22.4
$ lerna publish prerelease
lerna notice cli v3.20.2
lerna info current version 1.0.0
lerna info Assuming all packages changed

Changes:
 - @kaminrunde/example-project-fireside: 1.0.0 => 1.0.1-alpha.0 (private)
 - @kaminrunde/fireside-app: 1.0.0 => 1.0.1-alpha.0
 - @kaminrunde/fireside-utils: 1.0.0 => 1.0.1-alpha.0
 - @kaminrunde/gatsby-plugin-fireside: 1.0.0 => 1.0.1-alpha.0
 - @kaminrunde/storybook-addon-fireside: 1.0.0 => 1.0.1-alpha.0

? Are you sure you want to publish these packages? Yes

[...]

Successfully published:
 - @kaminrunde/fireside-app@1.0.1-alpha.0
 - @kaminrunde/fireside-utils@1.0.1-alpha.0
 - @kaminrunde/gatsby-plugin-fireside@1.0.1-alpha.0
 - @kaminrunde/storybook-addon-fireside@1.0.1-alpha.0
lerna success published 4 packages
```