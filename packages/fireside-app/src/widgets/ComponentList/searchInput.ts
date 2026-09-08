/**
 * the component search lives inside the list, but the shortcut that focuses
 * it is registered app wide - it has to be able to reach the field from a
 * route where the list is not even mounted
 */
let input: HTMLInputElement | null = null;

export function registerSearchInput(el: HTMLInputElement | null): void {
  input = el;
}

/** false when the list is not mounted yet, the caller can retry */
export function focusSearchInput(): boolean {
  if (!input) return false;
  input.focus();
  input.select();
  return true;
}
