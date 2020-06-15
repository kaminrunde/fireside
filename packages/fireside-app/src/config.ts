

type Config = {
  mediaSizes: {
    label: string,
    key: string,
    gap: number,
    // icon: 
    //   | 'MOBILE_S' | 'MOBILE_M' | 'MOBILE_L' 
    //   | 'TABLET_S' | 'TABLET_M' | 'TABLET_L' 
    //   | 'LAPTOP_S' | 'LAPTOP_M' | 'LAPTOP_L' 
    //   | 'DESKTOP_S' | 'DESKTOP_M' | 'DESKTOP_L',
    breakpoint: number,
    initialyActive: boolean,
  }[],
  widgets: never[],
  abFeature: boolean,
  allowBackground: boolean,
  allowStretch: boolean,
}

let config:Config = {
  mediaSizes: [],
  widgets: [],
  abFeature: false,
  allowBackground: true,
  allowStretch: true,
}
try {
  const userConfig:any = require('fireside-config')
  config = Object.assign({},config,userConfig)
}
catch(e){}

export default config