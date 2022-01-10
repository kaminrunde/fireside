import * as t from './types';
/**
 * We need to sort the compnents by their order in DOM. The browser starts rendering
 * as soon as there are 20 000 chars of the DOM available. for large stories this could
 * be problematic, because the first displayed component does not need to be the first in the
 * DOM (css-grid). this could lead to browser flickering
 *
 * The sorting logic:
 * - we think in rows!
 * - each componen should be at the position where it is in the DOM
 * - when two media-sizes have he same component at different row,
 */
export default function sortComponents(story: t.RawStory): t.RawStory;
