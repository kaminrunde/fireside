import * as t from '../types'

let globalCb:null|Function = null

const connector:t.Connector = {
  name: 'demoConnector',
  onChange: cb => {
    globalCb = cb
  },
  setStory: story => null
}

setTimeout(() => {
  if(!globalCb) return
  globalCb({
    componentsById: {
      'img-1': {
        label: 'img-1'
      },
      'text': {
        label: 'img-1'
      }
    },
    allComponents: ['img-1', 'text'],
    grids: {
      'MOBILE_M': {
        enabled: true,
        gap: 20,
        components: ['img-1', 'text'],
        grid: [
          ['img-1', 'img-1', '.'],
          ['text', 'text', 'text'],
        ],
        widths: ['1fr', '1fr', '1fr'],
        heights: ['auto', 'auto']
      }
    }
  })
}, 2000)

export default connector