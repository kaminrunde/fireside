import store from "store";
import * as plugins from "modules/plugins";
import { RawStory } from "@kaminrunde/fireside-utils";
import { createHash } from "crypto";

export default function updateStory(story: RawStory) {
  const hash = createHash("md5").update(JSON.stringify(story)).digest("hex");
  story.hash = hash;
  store.dispatch(plugins.a.setStory(story));
}
