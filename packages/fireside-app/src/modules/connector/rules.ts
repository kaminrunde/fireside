import { addRule } from "redux-ruleset";
import * as at from "./const";
import * as a from "./actions";
import * as t from "./types";
import * as s from "./selectors";
import { versionUpdate } from "@kaminrunde/fireside-utils";
import { gunzip } from "zlib";
import { promisify } from "util";
const gunzipAsync = promisify(gunzip);

addRule<a.SetConnector>({
  id: "connector/MANAGE_UPDATE",
  target: at.SET_CONNECTOR,
  output: at.UPDATE_STORY,
  concurrency: "LAST",
  consequence: (action, { dispatch }) => {
    const connector = action.payload;
    connector.onChange((story?: t.Story) => {
      // if we use a cms-connector that compresses stories, we decompress at this point
      if (story && story.hasOwnProperty("compressedStory")) {
        const compressedStory = story["compressedStory"];
        const compressedBuffer = Buffer.from(compressedStory, "base64");

        Promise.resolve()
          .then(() => gunzipAsync(compressedBuffer))
          .then((decompressedBuffer) => {
            story = JSON.parse(decompressedBuffer.toString());

            if (story) story = versionUpdate(story);
            dispatch(a.updateStory(story));
          })
          .catch((error) => {
            console.error("error connector/MANAGE_UPDATE:", error);
          });
      } else {
        if (story) story = versionUpdate(story);
        dispatch(a.updateStory(story));
      }
    });
    return () => null;
  },
});

addRule<a.UpdateConnector>({
  id: "connector/UPDATE_CONNECTOR",
  target: at.UPDATE_CONNECTOR,
  output: "#connector-update",
  consequence: (action, { getState }) => {
    const state = getState();
    const connector = s.getConnector(state.connector);
    if (!connector) return;
    connector.setStory(action.payload);
  },
});
