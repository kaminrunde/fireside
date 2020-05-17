import * as t from '../types'
import {v4} from 'uuid'

let globalCb:null|Function = null

const connector:t.Connector = {
  name: 'demoConnector',
  onChange: cb => {
    globalCb = cb
  },
  setStory: story => globalCb && globalCb(story)
}

setTimeout(() => {
  if(!globalCb) return
  globalCb({
    componentsById: {
      'Banner-1': {
        id: v4(),
        name: 'Banner',
        props: {
          gridArea: 'Banner-1',
          label: 'Banner 1',
          otherLabel: 'foo'
        }
      },
      'Banner-2': {
        id: v4(),
        name: 'Banner',
        props: {
          gridArea: 'Banner-2',
          label: 'Banner 2',
          otherLabel: 'foo'
        }
      },
      'Button-1': {
        id: v4(),
        name: 'Button',
        props: {
          gridArea: 'Button-1',
          label: 'Button 1'
        }
      },
    },
    allComponents: ['Banner-1', 'Button-1', 'Banner-2'],
    grids: {
      'MOBILE_M': {
        enabled: true,
        gap: 20,
        components: ['Banner-1', 'Button-1', 'Banner-2'],
        grid: [
          ['Banner-1', 'Banner-1', '.'],
          ['Button-1', 'Button-1', 'Button-1'],
        ],
        widths: ['1fr', '1fr', '1fr'],
        heights: ['auto', 'auto']
      },
      'MOBILE_L': {
        enabled: true,
        gap: 20,
        components: ['Banner-1', 'Button-1', 'Banner-2'],
        grid: [
          ['Banner-1', '.'],
          ['Button-1', 'Button-1'],
        ],
        widths: ['1fr', '1fr'],
        heights: ['auto', 'auto']
      }
    }
  })
}, 1000)

export default connector