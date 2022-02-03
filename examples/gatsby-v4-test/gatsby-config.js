var path = require('path')

require('source-map-support').install();
require('ts-node').register()

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // {
    //   resolve: `@kaminrunde/gatsby-plugin-fireside`,
    //   options: {
    //     resolveController: name => {
    //       try {
    //         return require(`./src/widgets/${name}/request.ts`)
    //       }
    //       catch(e) {
    //         return null
    //       }
    //     },
    //     nodes: ['Test'],
    //   },
    // },
    `gatsby-plugin-typescript`,
  ],
}
