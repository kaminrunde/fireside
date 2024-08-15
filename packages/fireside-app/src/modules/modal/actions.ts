import * as t from "./types";
import * as at from "./const";

export const setMessage = (message: t.Message) => ({
  type: at.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: at.CLEAR_MESSAGE,
});

export type SetMessage = ReturnType<typeof setMessage>;
export type ClearMessage = ReturnType<typeof clearMessage>;

export type Action = SetMessage | ClearMessage;
