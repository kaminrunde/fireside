import * as React from 'react'
import {createPlugin} from '@kaminrunde/fireside-utils'
import {produce} from 'immer'
import * as t from './types'
import * as utils from './utils'

export default createPlugin<t.State, t.PluginOptions>(ctx => {
  let modalConfirmed = false
  let pw = ''

  ctx.extendSettingsPage({
    row: {
      title: 'AB-TEST',
      component: api => {

        const activate = () => {
          if(ctx.options.password && pw !== ctx.options.password) {
            ctx.actions.alert({
              title: 'Wrong Password'
            })
            return
          }
          modalConfirmed = true
          api.setState({
            components: {},
            byId: {}
          })
        }
        const deactivate = async () => {
          const result = await ctx.actions.alert({
            title: 'Remove AB-Test',
            description: 'This will complete remove the ab-test logic. The components will persist. Please remove the components you don\'t want any longer manually afterwars',
            options: ['ABORT', 'OK']
          })
          if(result === 'OK') {
            modalConfirmed = false
            api.setState(undefined)
          }
        }
        return (
          <div>
            <button onClick={api.state ? deactivate : activate} style={styles.btn(Boolean(api.state))}>
              {api.state ? 'on' : 'off'}
            </button>
            {ctx.options.password && !api.state && (
              <input 
                style={styles.input()} 
                type='text' 
                defaultValue={pw}
                placeholder='password' 
                onChange={e => pw = e.target.value}
              />
            )}
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
          const newState = produce(state, state => {
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
          })
          const maxComponents = ctx.options.maxComponents
          if(maxComponents && Object.keys(newState.byId).length > maxComponents) {
            ctx.actions.alert({
              title: 'Limit reached',
              description: `You can only add up to ${maxComponents} components as an ab-test`
            })
            return
          }
          api.setState(newState)
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

  ctx.createStaticComponent({
    component: api => {
      if(!api.state) return null
      if(modalConfirmed) return null

      const handleSubmit = () => {
        if(pw !== ctx.options.password) return
        modalConfirmed = true
        api.setState(api.state)
      }

      return (
        <div>
          <div style={styles.staticOverlay()} />
          <div style={styles.staticWrapper()}>
            <h3 style={{textAlign:'center', fontFamily: "'Open Sans', sans-serif"}}>Running AB-Test</h3>
            <input 
              onChange={e => pw = e.target.value}
              style={styles.staticInput()} 
              placeholder='password' 
            />
            <br/>
            <button 
              onClick={handleSubmit}
              style={styles.staticButton()}>Submit</button>
          </div>
        </div>
      )
    }
  })

  let lastStoryHash = ''
  ctx.onStoryUpdate(api => {
    if(!api.state) return
    if(lastStoryHash === api.story.hash) return
    lastStoryHash = api.story.hash

    const newState = produce(api.state, state => {
      for(const ms in state.components) {
        if(!api.story.grids[ms].enabled) {
          delete state.components[ms]
          continue
        }
        const maxRowIndex = api.story.grids[ms].grid.length -1
        if(maxRowIndex === -1) {
          state.components[ms] = {A:[],B:[]}
        }
        console.log(maxRowIndex, api.state.components[ms])
        state.components[ms].A = state.components[ms].A.filter(n => n <= maxRowIndex)
        state.components[ms].B = state.components[ms].B.filter(n => n <= maxRowIndex)
      }

      utils.updateStateByComponents(state, api.story)
    })
    if(JSON.stringify(newState) !== JSON.stringify(api.state)) {
      api.setState(newState)
    }
  })

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
  }),
  input: () => ({
    border: '1px solid grey',
    padding: '11px 20px',
    marginLeft: '10px',
    borderRadius: '2px'
  }),
  staticOverlay: () => ({
    position: 'fixed',
    left: '0px',
    top: '0px',
    right: '0px',
    bottom: '0px',
    background: 'rgba(0,0,0,0.4)',
    zIndex: 9999999999999999
  }),
  staticWrapper: () => ({
    position: 'fixed',
    left: '50%',
    top: '100px',
    padding: '40px 60px',
    background: 'white',
    transform: 'translateX(-50%)',
    zIndex: 9999999999999999
  }),
  staticInput: () => ({
    padding: '8px',
    border: '1px solid grey',
    borderRadius: '5px',
    marginBottom: '20px'
  }),
  staticButton: () => ({
    display: 'block',
    width: '100%',
    padding: '10px',
    border: 'none',
    background: 'lightgrey',
    cursor: 'pointer'
  })
}