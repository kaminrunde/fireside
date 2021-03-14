import * as React from 'react'
import Component from './Button'
import { storiesOf } from '@storybook/react'
import * as b from '@kaminrunde/storybook-addon-fireside'
import controller from './request'

b.registerWidgetSelector(Component.name, props => {
  return {kind:'cms/base/Button',story: 'Builder'}
})

storiesOf('cms/base/Button', module)
  .add('Builder', b.create('Button', Component, [
    b.string('gridArea', 'Grid-Area', 'Button'),
    b.select('position', 'Position', 'left', {
      options: [
        { label: 'links', value: 'left' },
        { label: 'mitte', value: 'center' },
        { label: 'rechts', value: 'right' },
      ]
    }),
    b.constant('__version', 'Version', 1),
    b.string('label', 'Label', 'foo', {
      hint: 'Das ist der label'
    }),
  ],controller))
