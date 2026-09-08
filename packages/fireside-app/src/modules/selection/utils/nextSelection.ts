export type SelectionState = {
  ids: string[];
  anchor: string | null;
};

export type SelectionClick = {
  /** the clicked id */
  id: string;
  /**
   * the clicked item's neighbours in the order they are read on screen. A
   * range is resolved inside this list, so it never spans two panes and it
   * respects whatever filtering is applied
   */
  siblings: string[];
  /** cmd on mac, ctrl on windows and linux */
  multi: boolean;
  /** shift */
  range: boolean;
};

/**
 * shared selection semantics for the grid and the component list:
 * a plain click replaces the selection, ctrl/cmd adds or removes a single
 * item, shift takes the range from the anchor, ctrl/cmd + shift adds that
 * range to what is already selected
 */
export default function nextSelection(
  current: SelectionState,
  click: SelectionClick
): SelectionState {
  const anchorIndex = current.anchor
    ? click.siblings.indexOf(current.anchor)
    : -1;

  if (click.range && anchorIndex !== -1) {
    const targetIndex = click.siblings.indexOf(click.id);
    if (targetIndex !== -1) {
      const [from, to] =
        anchorIndex < targetIndex
          ? [anchorIndex, targetIndex]
          : [targetIndex, anchorIndex];
      const range = click.siblings.slice(from, to + 1);
      return {
        ids: click.multi
          ? current.ids.concat(range.filter((id) => !current.ids.includes(id)))
          : range,
        // the anchor stays put so the range can be resized by shift clicking again
        anchor: current.anchor,
      };
    }
  }

  if (click.multi || click.range) {
    const index = current.ids.indexOf(click.id);
    return {
      ids:
        index === -1
          ? current.ids.concat(click.id)
          : current.ids.filter((id) => id !== click.id),
      anchor: click.id,
    };
  }

  // plain click on the only selected item clears the selection
  const onlySelected =
    current.ids.length === 1 && current.ids[0] === click.id;
  return onlySelected
    ? { ids: [], anchor: null }
    : { ids: [click.id], anchor: click.id };
}
