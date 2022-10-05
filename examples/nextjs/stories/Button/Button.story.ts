import * as k from '@kaminrunde/storybook-addon-fireside'
import Component from './Button'

const config = {
  title: 'base',
  component: null,
}

export default config

k.registerWidgetSelector('Button', () => {
  return { kind: 'base', story: 'Button' }
})

export const Button = k.create(
  'Button',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'Button'),
    k.string('label', 'Label', 'Hello World'),
    k.stringList('list', 'List', ['a', 'b', 'c'])
  ],
  {}
)