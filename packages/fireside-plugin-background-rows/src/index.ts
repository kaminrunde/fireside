import {FaArrowsAltH} from 'react-icons/fa'
import {createPlugin} from '@kaminrunde/fireside-utils'

type State = {
  [row:number]: string
}

export default createPlugin<State>(ctx => {
  ctx.extendGridRow({
    badge: {
      component: FaArrowsAltH,
      isActive: () => true
    },
    icon: {
      component: FaArrowsAltH,
      isActive: () => true,
      onClick: () => null
    }
  })
  return {}
})

