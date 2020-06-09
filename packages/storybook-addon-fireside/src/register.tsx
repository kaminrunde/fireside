import {createHash} from 'crypto-browserify'
import * as React from 'react'
import addons from '@storybook/addons'
import * as t from './types'
import Panel from './Panel'

addons.register('addons:storyboard-bridge', api => {
  const channel:t.Channel = addons.getChannel()
  addons.addPanel('addons:storyboard-bridge', {
    title: 'Eigenschaften',
    render: () => <Panel channel={channel} api={api} />,
  })

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

  window.addEventListener('message', (e:any) => {
    if(typeof e.data !== 'object' || !e.data.type) return
    switch(e.data.type){
      case 'fireside-hydrate-component': {
        if(e.data.component){
          channel.emit('storyboard-bridge/hydrate-component', e.data.component)
        }
        else {
          api.selectStory(e.data.defaultStory)
        }
      }
    }
  })


  channel.on('storyboard-bridge/init-knob-manager', () => {
    window.parent.postMessage({
      type: 'fireside-init'
    }, '*')
  })

  // simulate hydrating
  // setTimeout(() => channel.emit('storyboard-bridge/hydrate-component', {
  //   id: 'generic-id',
  //   name: 'Button',
  //   props: {
  //     label: 'hydrated'
  //   }
  // }), 2000)
})

function sendToFiresideApp (component:any) {
  const hash = createHash('md5').update(JSON.stringify(component)).digest('hex')
  window.parent.postMessage({
    type: 'fireside-update-component',
    component: { ...component, hash }
  }, '*')
}