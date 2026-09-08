import * as React from "react";

export type Shortcut = {
  /** single character, compared case insensitive */
  key: string;
  /** ctrl on windows/linux, cmd on mac */
  mod?: boolean;
  shift?: boolean;
  /**
   * fire even while a text field has focus. Only for keys that are not
   * text input themselves, such as tab
   */
  allowInInput?: boolean;
};

/**
 * events coming from a text input must never trigger an editor action,
 * otherwise typing a grid width would buffer components
 */
function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable
  );
}

/**
 * binds a global keyboard shortcut for as long as the component is mounted.
 *
 * Note that keystrokes inside the storybook iframe never reach this listener,
 * so shortcuts are inactive while the pointer is inside the preview
 */
export default function useShortcut(
  shortcut: Shortcut,
  handler: () => void,
  enabled: boolean = true
) {
  const handlerRef = React.useRef(handler);
  const { key, mod = false, shift = false, allowInInput = false } = shortcut;

  React.useEffect(() => {
    handlerRef.current = handler;
  });

  React.useEffect(() => {
    if (!enabled) return;
    const listener = (e: KeyboardEvent) => {
      if (e.repeat || e.altKey) return;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      if (mod !== (e.ctrlKey || e.metaKey)) return;
      if (shift !== e.shiftKey) return;
      if (!allowInInput && isEditable(e.target)) return;
      // browsers bind some of these themselves (ctrl+b opens the bookmark
      // sidebar in firefox)
      e.preventDefault();
      handlerRef.current();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, mod, shift, allowInInput, enabled]);
}
