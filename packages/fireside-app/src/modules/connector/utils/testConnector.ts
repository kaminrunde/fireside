import * as t from "../types";

let globalCb: null | Function = null;

const connector: t.Connector = {
  name: "testConnector",
  onChange: (cb) => {
    globalCb = cb;
  },
  setStory: (story) => {
    setTimeout(() => globalCb && globalCb(story), 100);
    console.log(story);
  },
};

setTimeout(() => {
  if (!globalCb) return;
  globalCb({
    version: "2.0.0",
    componentsById: {
      "6bf3c91d9a8fc75925a516e2": {
        id: "6bf3c91d9a8fc75925a516e2",
        name: "Button",
        props: {
          gridArea: "Button-1",
          label: "test",
        },
        createdAt: 1613383175814,
        updatedAt: 1613384235626,
        hash: "918ef3dff6a2cdac9cf9f0f190db47b1",
      },
      "6b6e0a19297b3c5581dabd3c": {
        id: "6b6e0a19297b3c5581dabd3c",
        name: "Image",
        props: {
          gridArea: "Image-1",
        },
        createdAt: 1614095923355,
        updatedAt: 1614095929681,
        hash: "57d56e51bc52f346c0bb318d1e726a6d",
      },
    },
    allComponents: ["6bf3c91d9a8fc75925a516e2", "6b6e0a19297b3c5581dabd3c"],
    grids: {},
    hash: "6f49c052c0e88ec451ecf30308f04c1c",
    plugins: {},
  } as t.Story);
}, 1000);

export default connector;
