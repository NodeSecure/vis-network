// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

// CONSTANTS
const kFlagsEmojis = {
  isGit: "☁️",
  hasNativeCode: "🐲",
  hasIndirectDependencies: "🌲",
  hasWarnings: "⚠️",
  hasBannedFile: "⚔️",
  isOutdated: "⌚️",
  hasNoLicense: "📜",
  hasCustomResolver: "💎",
  hasMultipleLicenses: "📚",
  hasMinifiedCode: "🔬",
  isDeprecated: "⛔️",
  hasExternalCapacity: "🌍",
  hasScript: "📦",
  hasMissingOrUnusedDependency: "👀",
  hasManyPublishers: "👥",
  isDead: "💀",
  hasVulnerabilities: "🚨",
  hasDuplicate: "🎭"
}

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

// TODO: implement this function in @nodesecure/flags
export function getFlags(flags, options = {}) {
  const { metadata, vulnerabilities = [], versions } = options;

  if (!metadata.hasReceivedUpdateInOneYear && flags.includes("hasOutdatedDependency") && !flags.includes("isDead")) {
    flags.push("isDead");
  }
  if (metadata.hasManyPublishers && !flags.includes("hasManyPublishers")) {
    flags.push("hasManyPublishers");
  }
  if (metadata.hasChangedAuthor && !flags.includes("hasChangedAuthor")) {
    flags.push("hasChangedAuthor");
  }
  if (vulnerabilities.length > 0 && !flags.includes("hasVulnerabilities")) {
    flags.push("hasVulnerabilities");
  }
  if (versions.length > 1 && !flags.includes("hasDuplicate")) {
    flags.push("hasDuplicate");
  }

  return [...flags]
    .map((flagName) => kFlagsEmojis[flagName])
    .filter((value) => value !== undefined)
    .reduce((acc, cur) => `${acc} ${cur}`, "");
}
