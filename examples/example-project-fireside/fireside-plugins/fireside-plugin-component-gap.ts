import {createPlugin} from '@kaminrunde/fireside-utils'
import {FiChevronUp, FiChevronsUp} from 'react-icons/fi'

type State = {
  [mediaSizeAndId:string]: 'S' | 'M' | 'L'
}

const story = {
  plugins: {
    componentGap: {
      'XS-23öklgöj': 'S',
      'XL-asdaasöj': 'L',
    }
  }
}

export default createPlugin<State, {key:string}>(ctx => {

  /**
   * SMALL GAP
   */
  ctx.extendComponent({
    badge: {
      component: FiChevronUp,
      isActive: props => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'S'
      },
    },
    icon: {
      component: FiChevronUp,
      isActive: props => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'S'
      },
      onClick: props => {
        const id = `${props.mediaSize}-${props.component.id}`
        if(props.state[id] === 'S') {
          delete props.state[id]
          props.setState(props.state)
        }
        else {
          props.setState({
            ...props.state,
            [id]: 'S'
          })
        }
      }
    }
  })

  /**
   * MEDIUM GAP
   */
  ctx.extendComponent({
    badge: {
      component: FiChevronsUp,
      isActive: props => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'M'
      },
    },
    icon: {
      component: FiChevronsUp,
      isActive: props => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'M'
      },
      onClick: props => {
        const id = `${props.mediaSize}-${props.component.id}`
        if(props.state[id] === 'M') {
          delete props.state[id]
          props.setState(props.state)
        }
        else {
          props.setState({
            ...props.state,
            [id]: 'M'
          })
        }
      }
    }
  })

  return {}
})