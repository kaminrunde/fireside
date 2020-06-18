var {preprocessStory} = require('fireside-utils')

exports.createSchemaCustomization = ({actions}, config) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "Story",
    extend: () => ({
      resolve: async node => {
        if(!node.story) return null
        try {
          return await preprocessStory(node.story, config)
        } catch (e) {
          throw new Error(e.stack)
        }
      }
    })
  })

  const nodes = config.nodes.map(node => {
    if(typeof node === 'string') return {
      name:node, 
      key:'story'
    }
    else return node
  })

  createTypes(`
    ${nodes.map(node => `
    type ${node.name} implements Node {
      ${node.key}: JSON @Story @dontInfer
    }
    `).join('\n')}
  `)
}