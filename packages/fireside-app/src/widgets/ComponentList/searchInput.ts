/**
 * the component search lives inside the list, but the shortcut that focuses
 * it is registered app wide - it has to be able to reach the field from a
 * route where the list is not even mounted
 */
let input: HTMLInputElement | null = null;

/** frames over which the selection is asserted again, see below */
const REASSERT_FRAMES = 3;

export function registerSearchInput(el: HTMLInputElement | null): void {
  input = el;
}

/** false when the list is not mounted yet, the caller can retry */
export function focusSearchInput(): boolean {
  if (!input) return false;
  const el = input;

  const selectAll = () => {
    // do not steal focus back if the user has clicked somewhere else since
    if (document.activeElement !== el && document.activeElement !== document.body) {
      return false;
    }
    if (document.activeElement !== el) el.focus();
    el.setSelectionRange(0, el.value.length);
    return true;
  };

  selectAll();

  /**
   * focusing right after a route change races the render that follows it: a
   * re-render can put the caret back to the end, which leaves the field
   * looking focused while typing appends instead of replacing. Assert the
   * selection again over the next few frames
   */
  let frame = 0;
  const reassert = () => {
    if (frame++ >= REASSERT_FRAMES) return;
    if (!selectAll()) return;
    requestAnimationFrame(reassert);
  };
  requestAnimationFrame(reassert);

  return true;
}
