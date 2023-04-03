import store from "store";
import * as snackbar from "modules/snackbar";
import { Message } from "modules/snackbar/types";

export default function triggerSnackbarEvent(message: Message) {
  store.dispatch(
    snackbar.a.addMessage({
      type: message.type,
      title: message.title,
      content: message.content,
    })
  );
}
