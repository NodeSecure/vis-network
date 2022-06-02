// Import Third-party Dependencies
import { getManifestEmoji } from "@nodesecure/flags/web";

// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

// CONSTANTS
const kFlagsEmojis = Object.fromEntries(getManifestEmoji());

export async function getJSON(path, customHeaders = Object.create(null)) {
  const headers = {
    Accept: "application/json"
  };

  const raw = await fetch(path, {
    method: "GET",
    headers: Object.assign({}, headers, customHeaders)
  });

  return raw.json();
}

/**
 * @param {!number} id
 * @param {!string[]} flags
 * @param {string} [theme=LIGHT] theme
 * @returns {string}
 */
export function getNodeColor(id, flags, theme = "LIGHT") {
  if (id === 0) {
    return CONSTANTS.COLORS[theme].MAIN;
  }
  else if (flags.includes("hasWarnings") || flags.includes("hasMinifiedCode")) {
    return CONSTANTS.COLORS[theme].WARN;
  } 
  else if (flags.includes("hasIndirectDependencies")) {
    return CONSTANTS.COLORS[theme].INDIRECT;
  }

  return CONSTANTS.COLORS[theme].NORMAL;
}

export function getFlagsEmojisInlined(flags) {
  return [...flags]
    .map((title) => kFlagsEmojis[title] ?? null)
    .filter((value) => value !== null)
    .reduce((acc, cur) => `${acc} ${cur}`, "");
}
