var {preprocessStory} = require('@kaminrunde/fireside-utils')

exports.createSchemaCustomization = ({actions}, config) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "Story",
    extend: () => ({
      resolve: async node => {
        if(!node.story) return null
        try {
          let story = await preprocessStory(node.story, config)
          if(config.transformStory) story = config.transformStory(story)
          return story
        } catch (e) {
          console.error(e, e.stack)
          throw new Error(e)
        }
      }
    })
  })

  createFieldExtension({
    name: 'RawStory',
    extend: () => ({
      resolve: async source => {
        return JSON.stringify(source.story)
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
      Raw${node.key}: JSON @RawStory @dontInfer
    }
    `).join('\n')}
  `)
}