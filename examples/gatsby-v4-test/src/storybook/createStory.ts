import { storiesOf } from '@storybook/react'
// import withGlobalStyle from './decorators/withGlobalStyle'

declare global {
  interface Document {
    isStorybook: boolean
  }
}

document.isStorybook = true


export default (name, context) => {
  const story = storiesOf(name, context)

  // add decorators
  story
    // .addDecorator(withGlobalStyle)

  return story
}
