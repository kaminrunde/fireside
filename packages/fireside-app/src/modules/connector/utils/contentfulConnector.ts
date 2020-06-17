import * as t from '../types'
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk"

let sdk:null|any = null
let globalCb:any = ()=>null

const connector:t.Connector = {
  name: 'contentful',
  onChange: cb => {
    globalCb = cb
  },
  setStory: story => {
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
  sdk.field.onValueChanged(globalCb)
})

export default connector