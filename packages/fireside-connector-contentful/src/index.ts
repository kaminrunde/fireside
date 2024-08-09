import {Connector} from '@kaminrunde/fireside-utils'
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk"
import { gzip, gunzip } from "zlib"
import { promisify } from "util"

const gzipAsync = promisify(gzip)
const gunzipAsync = promisify(gunzip)

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
  setStory: async (story) => {
    /* 
      for the contentful connector we use a compressing mechanism, 
      because contentful entries can only be a maximum of 2 mb in size 
      the compressing mechanism can be used for other CMS as well
      the further processing of the compressed data is done in 
      `fireside-app/src/modules/connector/rules.ts`
    */
    const storyBuffer = Buffer.from(JSON.stringify(story))
    const compressedStory = await gzipAsync(storyBuffer)
    const compressedBase64 = Buffer.from(compressedStory).toString("base64")
    
    try {
      sdk && sdk.field.setValue({ compressedStory: compressedBase64 })
    } catch (e) {
      console.log("error sdk.field.setValue: ", e)
    }
  }
}

initContentfulExtension(async(_sdk:any) => {
  sdk = _sdk
  try {
    // @ts-ignore
    sdk.window.updateHeight(1000);
  } catch (e) {}

  let value = sdk.field.getValue();
  if (value && value.hasOwnProperty("compressedStory")) {
    const compressedBuffer = Buffer.from(value.compressedStory, "base64")
    const decompressedBuffer = await gunzipAsync(compressedBuffer)
    value = JSON.parse(decompressedBuffer.toString())
    console.log('value', value)
  }
  globalCb(value)
  sdk.field.onValueChanged(globalCb)
})

export default connector