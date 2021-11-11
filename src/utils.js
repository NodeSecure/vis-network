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
 * @returns {string}
 */
export function getNodeColor(id, flags) {
  if (id === 0) {
    return CONSTANTS.COLORS.MAIN;
  }
  else if (flags.includes("hasWarnings") || flags.includes("hasMinifiedCode")) {
    return CONSTANTS.COLORS.WARN;
  }
  else if (flags.includes("hasIndirectDependencies")) {
    return CONSTANTS.COLORS.INDIRECT;
  }

  return CONSTANTS.COLORS.NORMAL;
}

export function getFlagsEmojisInlined(flags) {
  return [...flags]
    .map((title) => kFlagsEmojis[title] ?? null)
    .filter((value) => value !== null)
    .reduce((acc, cur) => `${acc} ${cur}`, "");
}
