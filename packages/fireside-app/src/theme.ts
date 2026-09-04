/**
 * shared visual tokens. Fireside is embedded into contentful with roughly
 * 600px of width, so everything here is tuned for a narrow column
 */
const theme = {
  font: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif`,
  color: {
    text: "#1f2933",
    textMuted: "#7b8794",
    /** a component that is not placed in any grid */
    unused: "#c2410c",
    border: "#e4e7eb",
    surface: "#ffffff",
    surfaceMuted: "#f5f7fa",
    primary: "#4a8f2c",
    primaryHover: "#3f7a25",
    danger: "#d0432a",
    dangerHover: "#b53a24",
    accent: "#3d6f9e",
  },
  radius: "6px",
  shadow: "0 1px 2px rgba(31, 41, 51, 0.06)",
  shadowRaised: "0 2px 8px rgba(31, 41, 51, 0.12)",
};

export default theme;
