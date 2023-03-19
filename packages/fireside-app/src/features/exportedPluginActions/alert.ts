import * as ui from "modules/ui";
import { ModalConfig } from "modules/ui/types";
import store from "store";

export default function alert(state, clearAlertBoxCb, ctx: ModalConfig) {
  if (state.ui.modal) return;
  store.dispatch(ui.a.showModal(ctx));
  return new Promise((resolve) => {
    clearAlertBoxCb.push(resolve);
  });
}
