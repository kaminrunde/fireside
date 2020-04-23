import * as React from 'react'
import addons from '@storybook/addons'
import * as t from './types'
import getWidget from './widgets'
import Panel from './Panel'

addons.register('addons:storyboard-bridge', api => {
  const channel:t.Channel = addons.getChannel()
  addons.addPanel('addons:storyboard-bridge', {
    title: 'Eigenschaften',
    render: () => <Panel channel={channel} api={api} />,
  })

  console.log('mount')
  window.parent.postMessage('hello world', '*')

  let component = {
    id: '',
    name: 'not-known',
    props: {}
  }

  channel.on('storyboard-bridge/select-story', context => {
    api.selectStory(context.kind, context.story)
  })
  channel.on('storyboard-bridge/update-component-name', name => {
    component.name = name
    sendToFiresideApp(component)
  })
  channel.on('storyboard-bridge/update-component-props', props => {
    component.props = props
    sendToFiresideApp(component)
  })
  channel.on('storyboard-bridge/hydrate-component', ({id}) => {
    component.id = id
  })

  // simulate hydrating
  setTimeout(() => channel.emit('storyboard-bridge/hydrate-component', {
    id: 'generic-id',
    name: 'Button',
    props: {
      label: 'hydrated'
    }
  }), 2000)
})

function sendToFiresideApp (component:any) {
  window.parent.postMessage({
    type: 'fireside-update-component',
    component
  }, '*')
}