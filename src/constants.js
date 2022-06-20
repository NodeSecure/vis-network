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
    SELECTED: {
      color: "#673AB7",
      font: {
        color: "#FFF",
      },
    },
    DEFAULT: {
      color: "#37474F",
      font: {
        color: "#FFF",
      },
    },
    WARN: {
      color: "#DD2C00",
      font: {
        color: "#FFF",
      },
    },
    CONNECTED_IN: {
      color: "#2E7D32",
      font: {
        color: "#FFF",
      },
    },
    CONNECTED_OUT: {
      color: "#447d2e",
      font: {
        color: "#FFF",
      },
    },
    HARDTOREAD: {
      color: "rgba(20, 20, 20, 0.2)",
      font: {
        color: "#FFF",
      },
    },
  },
  DARK: {
    SELECTED: {
      color: "#01579B",
      font: {
        color: "#FFF",
      },
    },
    DEFAULT: {
      color: "rgba(150, 200, 200, 0.15)",
      font: {
        color: "#FFF",
      },
    },
    WARN: {
      color: "rgba(210, 115, 115, 0.30)",
      font: {
        color: "#FFF",
      },
    },
    CONNECTED_IN: {
      color: "rgba(170, 100, 200, 0.50)",
      font: {
        color: "#FFF",
      },
    },
    CONNECTED_OUT: {
      color: "rgba(140, 100, 200, 0.50)",
      font: {
        color: "#FFF",
      },
    },
    HARDTOREAD: {
      color: "rgba(150, 150, 150, 0.02)",
      font: {
        color: "#FFF",
      },
    },
  },
});
