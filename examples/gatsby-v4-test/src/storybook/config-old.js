import { configure, addParameters } from '@storybook/react' 
import { action } from '@storybook/addon-actions'

// const req = require.context('../widgets', true, /.story.[tj]sx?/)
const req = require.context('../widgets', true, /.story.js/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

addParameters({
  options: {panelPosition: 'right'}
})
configure(loadStories, module)

