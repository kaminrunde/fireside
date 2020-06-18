exports.createSchemaCustomization = ({actions}, config) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "Story",
    extend: () => ({
      resolve: async node => {
        if(!node.story) return null
        try {
          return null
          // return await preprocessStory(node.story)
        } catch (e) {
          throw new Error(e.stack)
        }
      }
    })
  })
}