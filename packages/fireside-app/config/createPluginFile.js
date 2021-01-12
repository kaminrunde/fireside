var path = require('path')
var fs = require('fs')
var firesideConfig = {}
if(process.env.NODE_ENV === 'production') {
  firesideConfig = require(`${process.env.CWD}/fireside-config`)
}
else {
  firesideConfig = require('../dev-fireside-config')
}

module.exports = function createPluginFile () {
  var outPlugins = path.resolve(__dirname, '../src/plugins.ts')
  var outConnector = path.resolve(__dirname, '../src/connector.ts')

  /**
   * create plugin files
   */
  var contentPlugins = ''

  if(firesideConfig.plugins) {
    firesideConfig.plugins.forEach((row,i) => {
      contentPlugins += `import plugin${i} from "${row.resolve}"\n`
    })

    contentPlugins += '\n\nexport default {\n'

    firesideConfig.plugins.forEach((row,i) => {
      contentPlugins += `  "${row.resolve}": plugin${i},\n`
    })

    contentPlugins += '}'
  }

  fs.writeFileSync(outPlugins, contentPlugins)

  /**
   * create connector file
   */
  var contentConnector = `export {default} from "${firesideConfig.connector}"`

  fs.writeFileSync(outConnector, contentConnector)

}