import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'

type State = {
  components: Record<string, 'A' | 'B'>
} | undefined

type PluginOptions = {
  key: string
  password?: string
  blacklist?: string[]
}

export default createPlugin<State, PluginOptions>(ctx => {
  let modalConfirmed = false

  // ctx.extendSettingsPage({
  //   row: {
  //     title: 'AB-TEST',
  //     component: api => {

  //       const activate = () => {
  //         modalConfirmed = true
  //         api.setState({
  //           components: {}
  //         })
  //       }
  //       const deactivate = () => {
  //         modalConfirmed = false
  //         api.setState(undefined)
  //       }
  //       return (
  //         <div>
  //           <button onClick={activate}>activate ab-test</button>
  //           <button onClick={deactivate}>deactivate ab-test</button>
  //         </div>
  //       )
  //     }
  //   }
  // })
  ctx.extendGridRow({
    settingsModal: {
      title: 'AB-Test',
      // isActive: api => Boolean(api.state),
      component: function RowModalRow (api) {
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
  // return undefined
  return {
    components: {}
  }
})
