import * as t from '../types'

let globalCb:null|Function = null

const connector:t.Connector = {
  name: 'demoConnector',
  onChange: cb => {
    globalCb = cb
  },
  setStory: story => {
    setTimeout(() => globalCb && globalCb(story), 100)
    console.log(story)
  }
}

setTimeout(() => {
  if(!globalCb) return
  globalCb({
    "componentsById": {
      "Banner-1": {
        "id": "1",
        "name": "Banner",
        "props": {
          "gridArea": "Banner-1",
          "label": "Banner 1",
          "otherLabel": "foo"
        }
      },
      "Button-1": {
        "id": "3",
        "name": "Button",
        "props": {
          "gridArea": "Button-1",
          "label": "Button 1"
        }
      },
      "Banner-2": {
        "id": "2",
        "name": "Banner",
        "props": {
          "gridArea": "Banner-2",
          "label": "Banner 2",
          "otherLabel": "foo"
        }
      }
    },
    "allComponents": [
      "Banner-1",
      "Button-1",
      "Banner-2"
    ],
    "grids": {
      "MOBILE_M": {
        "enabled": true,
        "gap": 20,
        "grid": [
          [
            "Banner-1",
            "Banner-1",
            "."
          ],
          [
            "Button-1",
            "Button-1",
            "Button-1"
          ]
        ],
        "widths": [
          "1fr",
          "1fr",
          "1fr"
        ],
        "heights": [
          "auto",
          "auto"
        ]
      },
      "MOBILE_L": {
        "enabled": true,
        "gap": 20,
        "grid": [
          [
            "Banner-1",
            "."
          ],
          [
            "Button-1",
            "Button-1"
          ]
        ],
        "widths": [
          "1fr",
          "1fr"
        ],
        "heights": [
          "auto",
          "auto"
        ]
      }
    },
    "hash": "9abda7766b4164d57f1085f22f5cb673"
  })
}, 1000)

export default connector