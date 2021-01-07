import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'
import Modal from './Modal'
import * as t from './types'

export default createPlugin<t.State, t.Options>(ctx => {
  ctx.extendGridRow({
    badge: {
      component: () => 'B',
      isActive: p => p.row in (p.state[p.mediaSize] || {})
    },
    settingsModal: {
      title: 'Background',
      component: props => <Modal {...props.api} options={ctx.options}/>
    }
  })
  return {}
})

