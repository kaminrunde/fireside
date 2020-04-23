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
      },
      'img-2': {
        label: 'img-2'
      }
    },
    allComponents: ['img-1', 'text'],
    grids: {
      'MOBILE_M': {
        enabled: true,
        gap: 20,
        components: ['img-1', 'text', 'img-2'],
        grid: [
          ['img-1', 'img-1', '.'],
          ['text', 'text', 'text'],
        ],
        widths: ['1fr', '1fr', '1fr'],
        heights: ['auto', 'auto']
      }
    }
  })
}, 1000)

export default connector