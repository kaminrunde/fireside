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
    sdk.window.updateHeight(600);
    sdk.window;
  } catch (e) {}
  const value = sdk.field.getValue();
  globalCb(value);
  sdk.field.onValueChanged(globalCb);
});

/**
 * dev fixture. Three components, two enabled media-sizes with a different
 * layout each, so multi-select, shift-ranges and buffering across devices
 * can be tried out without a running CMS
 */
const DEMO_STORY = {
  version: "2.0.0",
  componentsById: {
    "2e7728ba66196ce3a53d08e8": {
      id: "2e7728ba66196ce3a53d08e8",
      name: "Button",
      props: {
        gridArea: "Button123",
        position: "left",
        __version: 1,
        label: "foo",
      },
      createdAt: 1626710762275,
      updatedAt: 1626710762275,
      hash: "5b85fc8a8523c2f5c5f41c88592ca718",
    },
    "3f8839cb77207df4b64e19f9": {
      id: "3f8839cb77207df4b64e19f9",
      name: "Button",
      props: {
        gridArea: "Button456",
        position: "left",
        __version: 1,
        label: "bar",
      },
      createdAt: 1626710862275,
      updatedAt: 1626710862275,
      hash: "527c68ad10e93304d9ab7e576c2c49d3",
    },
    "4a9940dc88318ea5c75f2a0a": {
      id: "4a9940dc88318ea5c75f2a0a",
      name: "Button",
      props: {
        gridArea: "Button789",
        position: "left",
        __version: 1,
        label: "baz",
      },
      createdAt: 1626710962275,
      updatedAt: 1626710962275,
      hash: "5e3f66c1e79e4ae01d9475a2b0203300",
    },
  },
  allComponents: [
    "2e7728ba66196ce3a53d08e8",
    "3f8839cb77207df4b64e19f9",
    "4a9940dc88318ea5c75f2a0a",
  ],
  grids: {
    // two columns, Button789 alone in the second row
    XS: {
      enabled: true,
      gap: 10,
      grid: [
        ["2e7728ba66196ce3a53d08e8", "3f8839cb77207df4b64e19f9"],
        ["4a9940dc88318ea5c75f2a0a", "."],
      ],
      widths: ["1fr", "1fr"],
      heights: ["auto", "auto"],
    },
    // same components stacked in a single column
    SM: {
      enabled: true,
      gap: 15,
      grid: [
        ["2e7728ba66196ce3a53d08e8"],
        ["3f8839cb77207df4b64e19f9"],
        ["4a9940dc88318ea5c75f2a0a"],
      ],
      widths: ["1fr"],
      heights: ["auto", "auto", "auto"],
    },
    MD: {
      enabled: false,
      gap: 15,
      grid: [["."]],
      widths: ["1fr"],
      heights: ["auto"],
    },
    LG: {
      enabled: false,
      gap: 20,
      grid: [["."]],
      widths: ["1fr"],
      heights: ["auto"],
    },
    XL: {
      enabled: false,
      gap: 20,
      grid: [["."]],
      widths: ["1fr"],
      heights: ["auto"],
    },
  },
  hash: "5c988cbce0f8f3c2437782896297a54c",
  plugins: { fullWidth: {}, bg: {} },
};

setTimeout(() => {
  if (!globalCb) return;
  globalCb(DEMO_STORY);
}, 1000);

export default connector;
