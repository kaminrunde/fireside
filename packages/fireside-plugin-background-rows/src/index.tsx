import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'
import Modal from './Modal'
import Badge from './Badge'
import * as t from './types'

export default createPlugin<t.State, t.Options>(ctx => {
  ctx.extendGridRow({
    badge: {
      component: props => <Badge {...props} options={ctx.options}/>,
      isActive: p => p.row in (p.state[p.mediaSize] || {})
    },
    settingsModal: {
      title: 'Background',
      component: props => <Modal {...props} options={ctx.options}/>
    }
  })
  return {}
})

