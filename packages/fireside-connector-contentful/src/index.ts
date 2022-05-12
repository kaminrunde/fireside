import {Connector} from '@kaminrunde/fireside-utils'
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk"

let sdk:null|any = null
let initValue:any = 'empty'
let globalCb:any = (val) => {
  initValue = val
}

const connector:Connector = {
  name: 'contentful',
  onChange: cb => {
    globalCb = cb
    if(initValue !== 'empty') cb(initValue)
  },
  setStory: story => {
    console.log(story)
    sdk && sdk.field.setValue(story)
  }
}

initContentfulExtension((_sdk:any) => {
  sdk = _sdk
  try {
    // @ts-ignore
    sdk.window.updateHeight(600)
  }
  catch(e){}
  const value = sdk.field.getValue()
  globalCb(value)
  sdk.field.onValueChanged(globalCb)
})

export default connector