// import crypto from 'crypto'
// var story = require('./story.json')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// export const sourceNodes = async ({ actions }) => {
//   const { createNode } = actions

//   let meta:any = {}
//   const page = {
//     name: 'TEST',
//     title: 'TEST',
//     story: story
//   }

//   const json = JSON.stringify(page)

//   meta.id = 'my-id'
//   meta.parent = null
//   meta.children = []
//   meta.internal = {
//     type: 'MagazineArticle',
//     contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
//     mediaType: `application/json`,
//     content: json,
//     description: `MagazineArticle (${page.title})`
//   }

//   createNode({...page, ...meta})
// }

export const sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Data can come from anywhere, but for now create it manually
  const myData = {
    key: 123,
    story: {
      "componentsById": {
        "Banner-123": {
          "id": "64a50fe4b9d896c9124f4c3d",
          "name": "Banner",
          "props": {
            "gridArea": "Banner-123",
            "label": "foo",
            "otherLabel": "foo"
          },
          "hash": "1c10511477a40374f8ba4e0c0e569d00"
        }
      },
      "allComponents": [
        "Banner-123"
      ],
      "grids": {
        "MOBILE_M": {
          "enabled": true,
          "gap": 20,
          "grid": [
            [
              "Banner-123"
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
      "hash": "48190e4a6b7fd309fd2903787771cbc6"
    }
  }

  const nodeContent = JSON.stringify(myData)

  const nodeMeta = {
    id: createNodeId(`my-data-${myData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `Test`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(myData)
    }
  }

  const node = Object.assign({}, myData, nodeMeta)
  createNode(node)
}