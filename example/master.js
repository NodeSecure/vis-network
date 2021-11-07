// Import Internal Dependencies
import { NodeSecureDataSet, NodeSecureNetwork } from "../index.js";
import payload from "./payload.json";

document.addEventListener("DOMContentLoaded", async() => {
  const secureDataSet = new NodeSecureDataSet();
  await secureDataSet.init(payload, window.FLAGS);

  new NodeSecureNetwork(secureDataSet);
});
