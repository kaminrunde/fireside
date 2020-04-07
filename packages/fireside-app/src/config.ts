
let config = {
  mediaSizes: [],
  widgets: [],
  abFeature: false,
  allowBackground: true,
  allowStretch: true
}
try {
  const userConfig:any = require('fireside-config')
  config = Object.assign({},config,userConfig)
}
catch(e){}

export default config