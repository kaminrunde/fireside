

type Config = {
  mediaSizes: never[],
  widgets: never[],
  abFeature: boolean,
  allowBackground: boolean,
  allowStretch: boolean,
  foo: string
}

let config:Config = {
  mediaSizes: [],
  widgets: [],
  abFeature: false,
  allowBackground: true,
  allowStretch: true,
  foo: 'false'
}
try {
  const userConfig:any = require('fireside-config')
  config = Object.assign({},config,userConfig)
}
catch(e){}

export default config