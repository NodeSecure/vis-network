// Import Node.js Dependencies
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Import Third-party Dependencies*
import tap from "tap";

// Import Internal Dependencies
import NodeSecureDataSet from "../src/dataset.js";


// Import Third-party Dependencies


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "./dataset-payload.json");

const nsDataSet = new NodeSecureDataSet();
const dataSetPayloadStr = await fsPromises.readFile(filePath);
const dataSetPayload = JSON.parse(dataSetPayloadStr);

tap.test("NodeSecureDataSet.init", async(t) => {
  await nsDataSet.init(dataSetPayload);

  t.equal(nsDataSet.data, dataSetPayload, "should set data");
  t.equal(nsDataSet.warnings.length, 2, "should have 2 warnings");
  t.equal(nsDataSet.dependenciesCount, 3, "should have 3 dependencies");
  t.equal(nsDataSet.indirectDependencies, 1, "should have 1 indirect dependency");
  t.equal(nsDataSet.size, 400, "should have 400 bytes");
  t.equal(nsDataSet.packages.length, 3, "should have 3 packages");
  t.equal(nsDataSet.linker.size, 3, "should have 3 linker entries");
  t.equal(nsDataSet.rawNodesData.length, 3, "should have 3 raw nodes");
  t.equal(nsDataSet.rawEdgesData.length, 2, "should have 2 raw edges");
  t.equal(nsDataSet.authors.size, 1, "should have 1 author");
  t.equal(Object.keys(nsDataSet.extensions).length, 5, "should have 5 extensions");
  t.equal(Object.keys(nsDataSet.licenses).length, 3, "should have 3 licenses");
  t.equal(nsDataSet.licenses.Unknown, 1, "should have 1 unknown license");

  t.end();
});
