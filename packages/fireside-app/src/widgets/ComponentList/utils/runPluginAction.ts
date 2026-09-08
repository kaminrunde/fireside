import { Component } from "@kaminrunde/fireside-utils";

/**
 * component placed plugin buttons are curried: onClickFn(component) returns
 * the actual handler. Older ones do the work directly and return nothing, so
 * only call the result when we got a function back
 */
export default function runPluginAction(
  onClickFn: (arg?: any) => any,
  component: Component
): void {
  const result = onClickFn(component);
  if (typeof result === "function") result();
}
