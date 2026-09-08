import config from "config";
import { Shortcut } from "hooks/useShortcut";

export type ShortcutInfo = Shortcut & {
  /** shown in the shortcut list on the settings page */
  description: string;
};

export const BUFFER: ShortcutInfo = {
  key: "b",
  mod: true,
  description: "Move the selected components to the buffer of this breakpoint",
};

export const BUFFER_ALL: ShortcutInfo = {
  key: "b",
  mod: true,
  shift: true,
  description:
    "Move the selected components to the buffer of every active breakpoint",
};

export const OPEN_COMPONENT: ShortcutInfo = {
  key: "Enter",
  description: "Open the selected component in storybook",
};

export const COPY_COMPONENT: ShortcutInfo = {
  key: "c",
  mod: true,
  description: "Copy the selected component (component list)",
};

export const DELETE_COMPONENT: ShortcutInfo = {
  key: "d",
  mod: true,
  description: "Delete the selected component (component list)",
};

export const NEXT_COMPONENT: ShortcutInfo = {
  key: "Tab",
  allowInInput: true,
  description: "Make the next component in the list active",
};

export const PREV_COMPONENT: ShortcutInfo = {
  key: "Tab",
  shift: true,
  allowInInput: true,
  description: "Make the previous component in the list active",
};

export const FOCUS_SEARCH: ShortcutInfo = {
  key: "s",
  mod: true,
  description: "Jump to the component list and focus the search",
};

export const EDITOR_SHORTCUTS: ShortcutInfo[] = [
  BUFFER,
  BUFFER_ALL,
  OPEN_COMPONENT,
  COPY_COMPONENT,
  DELETE_COMPONENT,
  FOCUS_SEARCH,
  NEXT_COMPONENT,
  PREV_COMPONENT,
];

/**
 * routes reachable by digit, in sidebar order. The index + 1 is the key, so
 * the mapping stays fixed even when a breakpoint is switched off
 */
export const ROUTES: { path: string; label: string }[] = [
  { path: "/", label: "Components" },
  ...config.mediaSizes.map((ms) => ({
    path: `/grid/${ms.key}`,
    label: ms.label,
  })),
  { path: "/settings", label: "Settings" },
].slice(0, 9);

const isMac = () =>
  typeof navigator !== "undefined" && /mac/i.test(navigator.platform);

/** how a binding is written out for the user */
export function formatShortcut(shortcut: Shortcut): string {
  let parts: string[] = [];
  if (shortcut.mod) parts.push(isMac() ? "Cmd" : "Ctrl");
  if (shortcut.shift) parts.push("Shift");
  parts.push(
    shortcut.key.length === 1 ? shortcut.key.toUpperCase() : shortcut.key
  );
  return parts.join(" + ");
}
