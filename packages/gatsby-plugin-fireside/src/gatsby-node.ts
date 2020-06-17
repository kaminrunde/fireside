import * as t from './types'
import preprocessStory from './preprocessStory'

export const createSchemaCustomization = ({actions}:any, config:t.Config) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "Story",
    extend: () => ({
      resolve: async (node:t.GatsbyNode) => {
        if(!node.story) return null
        try {
          return await preprocessStory(node.story)
        } catch (e) {
          throw new Error(e.stack)
        }
      }
    })
  })
}