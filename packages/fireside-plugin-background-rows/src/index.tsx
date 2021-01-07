import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'
import Modal from './Modal'
import * as t from './types'

export default createPlugin<t.State, t.Options>(ctx => {
  ctx.extendGridRow({
    badge: {
      component: () => 'B',
      isActive: p => p.row in p.state
    },
    // icon: {
    //   component: () => 'BG',
    //   isActive: p => p.row in p.state,
    //   onClick: p => {
    //     const newState = {...p.state}
    //     if(p.row in p.state) {
    //       delete newState[p.row]
    //     }
    //     else {
    //       newState[p.row] = 'green'
    //     }
    //     p.setState(newState)
    //   }
    // },
    settingsModal: {
      title: 'Background',
      component: props => <Modal {...props} options={ctx.options}/>
    }
  })
  return {}
})

