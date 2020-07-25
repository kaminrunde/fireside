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
    b.bool('selected', 'Selected', true),
    b.string('foo', 'Label', 'foo',{
      tab: 'TAB-1',
      hint: 'Hello World',
    }),
    b.string('otherLabel', 'Other Label', 'foo',{
      tab: 'TAB-2'
    }),
    b.number('number', 'Number', 2),
    b.markdown('label', 'Markdown', 'Foo'),
    b.stringList('todos', 'List of Todos', ['buy coffee', 'star fireside on github'])
  ]))
