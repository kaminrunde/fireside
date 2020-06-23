# fireside
WIP

## Lerna

Usage:

```bash
# bootstrap
lerna bootstrap --force-local
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
