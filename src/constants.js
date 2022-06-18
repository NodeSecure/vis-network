/**
 * SELECTED -> The color when a Node is selected.
 * CONNECTED_IN -> The color for first-degree nodes connected in the selected one.
 * CONNECTED_OUT -> The color for first-degree nodes connected out the selected one.
 * DEFAULT -> Default color for all nodes.
 * WARN -> Color for nodes with vulnerabilities or SAST warnings.
 * HARDTOREAD -> A color to make a node hard to read (useful in selection mode).
 */

export const COLORS = Object.freeze({
  LIGHT: {
    SELECTED: "#673AB7",
    DEFAULT: "#37474F",
    WARN: "#DD2C00",
    CONNECTED_IN: "#2E7D32",
    CONNECTED_OUT: "#447d2e",
    HARDTOREAD: "rgba(20, 20, 20, 0.2)",
  },
  DARK: {
    SELECTED: "#01579B",
    DEFAULT: "rgba(150, 200, 200, 0.15)",
    WARN: "rgba(210, 115, 115, 0.30)",
    CONNECTED_IN: "rgba(170, 100, 200, 0.50)",
    CONNECTED_OUT: "rgba(140, 100, 200, 0.50)",
    HARDTOREAD: "rgba(150, 150, 150, 0.02)",
  },
});
