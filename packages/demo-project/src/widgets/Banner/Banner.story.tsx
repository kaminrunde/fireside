import * as React from 'react'
import Component from './Banner'
import { storiesOf } from '@storybook/react'
import * as b from 'storybook-addon-fireside'

b.registerWidgetSelector(Component.name, props => {
  return {kind:'cms/base/Banner',story: 'Builder'}
})

storiesOf('cms/base/Banner', module)
  .add('Builder', b.create('Banner', Component, [
    b.string('label', 'Label', 'foo',{
      tab: 'TAB-1'
    }),
    b.string('otherLabel', 'Other Label', 'foo',{
      tab: 'TAB-2'
    }),
  ]))
