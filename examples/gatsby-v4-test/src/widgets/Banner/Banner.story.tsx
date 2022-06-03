// import React from 'react'
import Component from './Banner'
// import { storiesOf } from '@storybook/react'
import * as b from '@kaminrunde/storybook-addon-fireside'
import * as controller from './request'
import * as c from '../../storybook/knobs/knobs'

b.registerWidgetSelector(Component.name, props => {
  return {kind:'base',story: 'Banner'}
})

export default {
  title: 'base',
  component: null,
}


export const Banner = b.create(
  'Banner',
  Component,
  [
    b.string('gridArea', 'Grid-Area', 'Banner', {
      validate: s => !s && 'a value is needed'
    }),
    b.bool('selected', 'Selected', true),
    b.string('maybe', 'Maybe', '', {
      shouldDisplay: props => props.selected
    }),
    c.string('foo', 'Label', 'foo',{
      tab: 'TAB-1',
      hint: 'Hello World',
      foo: 'bar'
    }),
    b.string('otherLabel', 'Other Label', 'foo',{
      tab: 'TAB-2'
    }),
    b.number('number', 'Number', 2),
    b.markdown('label', 'Markdown', 'Foo'),
    b.stringList('todos', 'List of Todos', ['buy coffee', 'star fireside on github']),
    b.objectList('objects', 'Objects', [
      {foo: 'initial-foo', other: {num: 10}}
    ], {
      schema: [
        b.string('foo', 'Foo', 'bar'),
        b.number('other.num', 'Number', 2),
      ],
      getRowName: row => row.foo
    })
  ],
  controller
)


