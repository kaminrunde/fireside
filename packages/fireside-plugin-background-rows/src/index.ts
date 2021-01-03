import {FaArrowsAltH} from 'react-icons/fa'
import {createPlugin} from '@kaminrunde/fireside-utils'
import Modal from './Modal'

type State = {
  [row:number]: string
}

export default createPlugin<State>(ctx => {
  ctx.extendGridRow({
    badge: {
      component: () => null,
      isActive: p => p.row in p.state
    },
    icon: {
      component: () => 'BG',
      isActive: p => p.row in p.state,
      onClick: p => {
        const newState = {...p.state}
        if(p.row in p.state) {
          delete newState[p.row]
        }
        else {
          newState[p.row] = 'green'
        }
        p.setState(newState)
      }
    },
    settingsModal: {
      title: 'Background',
      component: Modal
    }
  })
  return {}
})

