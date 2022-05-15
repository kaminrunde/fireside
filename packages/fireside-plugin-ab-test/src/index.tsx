import * as React from 'react'
import {FaArrowsAltH} from 'react-icons/fa'
import {createPlugin} from '@kaminrunde/fireside-utils'
import produce from 'immer'

type State = {
  components: Record<string, 'A' | 'B'>
} | undefined

export default createPlugin<State, {key:string}>(ctx => {
  let modalConfirmed = false

  ctx.extendSettingsPage({
    row: {
      title: 'AB-TEST',
      component: api => {

        const activate = () => {
          modalConfirmed = true
          api.setState({
            components: {}
          })
        }
        const deactivate = () => {
          modalConfirmed = false
          api.setState(undefined)
        }
        return (
          <div>
            <button onClick={activate}>activate ab-test</button>
            <button onClick={deactivate}>deactivate ab-test</button>
          </div>
        )
      }
    }
  })
  ctx.extendGridRow({
    settingsModal: {
      title: 'AB-Test',
      isActive: api => Boolean(api.state),
      component: api => {
        const setVariation = (v:'A'|'B'|'AB') => () => {
          
        }
        return (
          <div>
            <button onClick={setVariation('A')}>A</button>
            <button onClick={setVariation('B')}>B</button>
            <button onClick={setVariation('AB')}>Both</button>
          </div>
        )
      }
    }
  })

  // ctx.createModal({
  //   isActive: ({state}) => state.active && !modalConfirmed,
  //   component: api => {

  //   }
  // })
  return undefined
})

