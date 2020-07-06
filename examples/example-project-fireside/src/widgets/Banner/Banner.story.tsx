import * as React from 'react'
import Component from './Banner'
import { storiesOf } from '@storybook/react'
import * as b from '@kaminrunde/storybook-addon-fireside'

b.registerWidgetSelector(Component.name, props => {
  return {kind:'cms/base/Banner',story: 'Builder'}
})

storiesOf('cms/base/Banner', module)
  .add('Builder', b.create('Banner', Component, [
    b.string('gridArea', 'Grid-Area', 'Banner'),
    b.string('label', 'Label', 'foo',{
      tab: 'TAB-1',
      hint: 'Hello World',
      foo: 'bar'
    }),
    b.string('otherLabel', 'Other Label', 'foo',{
      tab: 'TAB-2'
    }),
  ]))
