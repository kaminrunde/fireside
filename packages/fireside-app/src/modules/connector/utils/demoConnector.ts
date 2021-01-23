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
    "version": "1.0.0",
    "componentsById": {
      "Banner": {
        "id": "79fc3d04795b176be15a059f",
        "name": "Banner",
        "props": {
          "gridArea": "Banner",
          "selected": true,
          "foo": "foo",
          "otherLabel": "foo",
          "number": 2,
          "label": "Foo",
          "todos": [
            "buy coffee",
            "star fireside on github"
          ],
          "objects": []
        },
        "createdAt": 1611440639583,
        "updatedAt": 1611440639647,
        "hash": "dd52501f6938c3d82658391f67bcd405"
      },
      "Button": {
        "id": "5fee7b8a1006898ecf06b7c9",
        "name": "Button",
        "props": {
          "gridArea": "Button",
          "__version": 1,
          "label": "foo",
          "position": "left"
        },
        "createdAt": 1611440639583,
        "updatedAt": 1611440646020,
        "hash": "fed34f0d927fb9a84adc5a0fe90749e9"
      }
    },
    "allComponents": [
      "Banner",
      "Button"
    ],
    "grids": {
      "MOBILE": {
        "enabled": true,
        "gap": 20,
        "grid": [
          [
            "Banner"
          ],
          [
            "Button"
          ]
        ],
        "widths": [
          "1fr"
        ],
        "heights": [
          "auto",
          "auto"
        ]
      },
      "TABLET": {
        "enabled": false,
        "gap": 20,
        "grid": [
          [
            "."
          ]
        ],
        "widths": [
          "1fr"
        ],
        "heights": [
          "auto"
        ]
      },
      "LAPTOP": {
        "enabled": false,
        "gap": 20,
        "grid": [
          [
            "."
          ]
        ],
        "widths": [
          "1fr"
        ],
        "heights": [
          "auto"
        ]
      }
    },
    "hash": "5f079b14a06fd9c3cee534c3ab319d04",
    "plugins": {
      "fullWidth": {},
      "bg": {}
    }
  } as t.Story)
}, 1000)

export default connector