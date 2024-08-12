import * as t from "../types";
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";

let sdk: null | any = null;
let initValue: any = null;
let globalCb: any = (val) => {
  initValue = val;
};

const connector: t.Connector = {
  name: "contentful",
  onChange: (cb) => {
    globalCb = cb;
    if (initValue) cb(initValue);
  },
  setStory: (story) => {
    console.log(story);
    sdk && sdk.field.setValue(story);
  },
};

initContentfulExtension((_sdk: any) => {
  sdk = _sdk;
  try {
    // @ts-ignore
    sdk.window.updateHeight(1000);
  } catch (e) {}
  const value = sdk.field.getValue();
  globalCb(value);
  sdk.field.onValueChanged(globalCb);
});

export default connector;
