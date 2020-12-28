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
  var out = path.resolve(__dirname, '../src/plugins.ts')

  var content = ''

  if(firesideConfig.plugins) {
    firesideConfig.plugins.forEach((row,i) => {
      content += `import plugin${i} from "${row.resolve}"\n`
    })

    content += '\n\nexport default {\n'

    firesideConfig.plugins.forEach((row,i) => {
      content += `  "${row.resolve}": plugin${i},\n`
    })

    content += '}'
  }

  fs.writeFileSync(out, content)
}