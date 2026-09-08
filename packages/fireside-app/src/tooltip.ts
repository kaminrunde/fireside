import { css } from "styled-components";
import theme from "theme";

/**
 * tooltip for icon-only controls, driven by a data-tooltip attribute.
 *
 * Pure css on a pseudo element: no extra markup, no js, and nothing to keep
 * in sync. Use data-tooltip rather than title, or the browser shows its own
 * slow one on top of this. Keep aria-label on the element for screen readers
 */
const tooltip = css`
  position: relative;

  &[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    max-width: 220px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    background: ${theme.color.text};
    color: white;
    font-size: 11px;
    font-weight: 500;
    line-height: 15px;
    text-align: center;
    white-space: normal;
    pointer-events: none;
    opacity: 0;
    transition: opacity 90ms ease;
  }

  /* the delay keeps tooltips from flashing while the pointer crosses a row */
  &[data-tooltip]:hover::after {
    opacity: 1;
    transition-delay: 350ms;
  }
`;

export default tooltip;
