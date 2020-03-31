import * as React from 'react'
import Component from './Button'
import { storiesOf } from '@storybook/react'
import * as b from 'storybook-addon-fireside'

b.registerWidgetSelector(Component.name, props => {
  return {kind:'cms/base/Button',story: 'Builder'}
})

storiesOf('cms/base/Button', module)
  .add('Builder', b.create('Button', Component, [
    b.constant('__version', 'Version', 1),
    b.string('label', 'Label', 'foo', {
      hint: 'Das ist der label'
    }),
  ],{
    versionUpdate: props => {
      let newProps = props
      if(!props.__version){
        newProps = {...newProps}
        newProps.__version = 1
        newProps.label = newProps.label + '-version-1-'
      }
      return newProps
    },
    createContext: async props => {
      return {foo:'bar'}
    }
  }))
