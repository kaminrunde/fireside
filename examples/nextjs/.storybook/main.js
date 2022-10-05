module.exports = {
  "stories": [
    "../stories/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@kaminrunde/storybook-addon-fireside/lib/register',
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}