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