import {FaArrowsAltH} from 'react-icons/fa'
import {createPlugin} from '@kaminrunde/fireside-utils'
import produce from 'immer'

type State = {
  [componentId:string]: {
    [mediaSize:string]: boolean
  }
}

export default createPlugin<State>(ctx => {
  ctx.extendComponent({
    badge: {
      component: FaArrowsAltH,
      isActive: api => {
        const state = api.getState()
        const c = api.getComponent()
        const ms = api.getCurrentMediaSize()
        if(!state[c.id]) return false
        return(!!state[c.id][ms])
      }
    },
    icon: {
      component: FaArrowsAltH,
      isActive: api => {
        const state = api.getState()
        const c = api.getComponent()
        const ms = api.getCurrentMediaSize()
        if(!state[c.id]) return false
        return(!!state[c.id][ms])
      },
      onClick: api => {
        const state = api.getState()
        const c = api.getComponent()
        const ms = api.getCurrentMediaSize()
        api.setState(produce(state, draft => {
          if(!draft[c.id]) draft[c.id] = {}
          draft[c.id][ms] = !draft[c.id][ms]
        }))
      }
    }
  })
  return {}
})

