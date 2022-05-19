import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'
import {produce} from 'immer'
import * as t from './types'
import * as utils from './utils'

export default createPlugin<t.State, t.PluginOptions>(ctx => {
  let modalConfirmed = false

  ctx.extendSettingsPage({
    row: {
      title: 'AB-TEST',
      component: api => {

        const activate = () => {
          modalConfirmed = true
          api.setState({
            components: {},
            byId: {}
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
    badge: {
      component: (api) => (
        <div style={styles.badge(api.state.components[api.mediaSize].A.includes(api.row))}>
          {api.state.components[api.mediaSize].A.includes(api.row) ? 'A' : 'B'}
        </div>
      ),
      isActive: (api) => api.state && (
          api.state.components[api.mediaSize]?.A.includes(api.row) 
        || api.state.components[api.mediaSize]?.B.includes(api.row)
        )
    },
    settingsModal: {
      title: 'AB-Test',
      isActive: api => Boolean(api.state),
      component: function RowModalRow (api) {
        const setVariation = (v:'A'|'B'|'AB') => () => {
          const {state, mediaSize,row, story} = api
          api.setState(produce(state, state => {
            if(!state.components[mediaSize]) state.components[mediaSize] = {
              A: [],
              B: []
            }
            const r = (i:number) => i !== row
            if(v === 'AB') {
              state.components[mediaSize]['A'] = state.components[mediaSize]['A'].filter(r)
              state.components[mediaSize]['B'] = state.components[mediaSize]['B'].filter(r)
              if(state.components[mediaSize]['A'].length === 0 
              && state.components[mediaSize]['B'].length === 0) {
                delete state.components[mediaSize]
              }
            }
            else {
              state.components[mediaSize]['A'] = state.components[mediaSize]['A'].filter(r)
              state.components[mediaSize]['B'] = state.components[mediaSize]['B'].filter(r)
              state.components[mediaSize][v].push(row)
            }
            utils.updateStateByComponents(state, story)
          }))
        }

        const {state, mediaSize,row} = api
        const mode = state.components[mediaSize]?.A.includes(row) ? 'A'
                   : state.components[mediaSize]?.B.includes(row) ? 'B'
                   : 'AB'
        return (
          <div style={styles.btnWrapper()}>
            <button style={styles.btn(mode === 'A')} onClick={setVariation('A')}>A</button>
            <button style={styles.btn(mode === 'B')} onClick={setVariation('B')}>B</button>
            <button style={styles.btn(mode === 'AB')} onClick={setVariation('AB')}>Both</button>
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
  // return {
  //   components: {},
  //   byId: {}
  // }
  return undefined
})




const styles = {
  badge: (isA:boolean) => ({
    background: isA ? 'green' : 'red',
    width:'100%',
    height:'100%',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'100%',
    color:'white'
  }),
  btnWrapper: () => ({
    display: 'flex',
    gap: 10,
    padding: 10
  }),
  btn: (active:boolean) => ({
    border: 'none',
    padding: '10px 20px',
    background: active ? 'green' : 'lightgrey',
    fontSize: 18,
    cursor: 'pointer',
  })
}