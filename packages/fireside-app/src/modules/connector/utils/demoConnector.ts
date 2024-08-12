import * as t from "../types";
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";

let globalCb: null | Function = null;
let sdk: null | any = null;

const connector: t.Connector = {
  name: "demoConnector",
  onChange: (cb) => {
    globalCb = cb;
  },
  setStory: (story) => {
    setTimeout(() => globalCb && globalCb(story), 100);
    console.log(story);
  },
};

initContentfulExtension((_sdk) => {
  sdk = _sdk;
  try {
    // @ts-ignore
    sdk.window.updateHeight(1000);
    sdk.window;
  } catch (e) {}
  const value = sdk.field.getValue();
  globalCb(value);
  sdk.field.onValueChanged(globalCb);
});

setTimeout(() => {
  if (!globalCb) return;
  globalCb(
    JSON.parse(
      '{"version":"2.0.0","componentsById":{"2e7728ba66196ce3a53d08e8":{"id":"2e7728ba66196ce3a53d08e8","name":"Button","props":{"gridArea":"Button123","position":"left","__version":1,"label":"foo"},"createdAt":1626710762275,"updatedAt":1626710780598,"hash":"c7e483830fbc61bdbbf9531ead8c1220"}},"allComponents":["2e7728ba66196ce3a53d08e8"],"grids":{"XS":{"enabled":true,"gap":10,"grid":[["."]],"widths":["1fr"],"heights":["auto"]},"SM":{"enabled":false,"gap":15,"grid":[["."]],"widths":["1fr"],"heights":["auto"]},"MD":{"enabled":false,"gap":15,"grid":[["."]],"widths":["1fr"],"heights":["auto"]},"LG":{"enabled":false,"gap":20,"grid":[["."]],"widths":["1fr"],"heights":["auto"]},"XL":{"enabled":false,"gap":20,"grid":[["."]],"widths":["1fr"],"heights":["auto"]}},"hash":"1d50dcfee2699471cb068509d1838828","plugins":{"fullWidth":{},"bg":{}}}'
    )
  );
}, 1000);

export default connector;
