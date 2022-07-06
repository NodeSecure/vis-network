// Import Node.js Dependencies
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Import Third-party Dependencies*
import tap from "tap";

// Import Internal Dependencies
import NodeSecureDataSet from "../src/dataset.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "./dataset-payload.json");
const dataSetPayloadStr = await fsPromises.readFile(filePath);
const dataSetPayload = JSON.parse(dataSetPayloadStr);

tap.test("NodeSecureDataSet.init with given payload", async(t) => {
  const nsDataSet = new NodeSecureDataSet();
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

tap.test("NodeSecureDataSet.init should fetch data & flags from the network", async(t) => {
  global.fetch = (path) => Promise.resolve({ json: () => (path === "/data" ? dataSetPayload : "FLAG_01") });

  const nsDataSet = new NodeSecureDataSet();
  await nsDataSet.init();

  t.equal(nsDataSet.data, dataSetPayload, "should fetch data");
  t.equal(nsDataSet.FLAGS, "FLAG_01", "should fetch flags");

  t.end();
});

tap.test("NodeSecureDataSet.prettySize", (t) => {
  const nsDataSet = new NodeSecureDataSet();
  nsDataSet.size = 1337;
  tap.equal(nsDataSet.prettySize, "1.34 kB", "should convert bytes to human readable string");

  t.end();
});

tap.test("NodeSecureDataSet.computeExtensions", (t) => {
  const nsDataSet = new NodeSecureDataSet();
  t.equal(Object.keys(nsDataSet.extensions).length, 0, "should have 0 extensions");
  nsDataSet.computeExtension([".js", ".js", ".json"]);
  console.log("[NodeSecureDataSet] Computing extensions...", nsDataSet.extensions);
  t.equal(Object.keys(nsDataSet.extensions).length, 2, "should have 2 extension (js and json)");
  t.equal(nsDataSet.extensions[".js"], 2, "should have 2 '.js' extensions'");

  t.end();
});

tap.test("NodeSecureDataSet.computeLicenses", (t) => {
  const nsDataSet = new NodeSecureDataSet();
  nsDataSet.computeLicense("MIT");
  t.equal(Object.keys(nsDataSet.licenses).length, 1, "should have 1 license");
  t.equal(nsDataSet.licenses.Unknown, 1, "should have 1 unknown license");

  nsDataSet.computeLicense({ uniqueLicenseIds: ["MIT", "MIT", "RND"] });
  t.equal(Object.keys(nsDataSet.licenses).length, 3, "should have 3 licenses (MIT, RND & 1 unknown)");
  t.equal(nsDataSet.licenses.MIT, 2, "should have 2 MIT licenses");

  t.end();
});

tap.test("NodeSecureDataSet.computeAuthors", (t) => {
  const nsDataSet = new NodeSecureDataSet();
  nsDataSet.computeAuthor({ name: "John Doe" });
  t.equal(nsDataSet.authors.get("John Doe").count, 1, "should have 1 author: John Doe");
  nsDataSet.computeAuthor({ name: "John Doe" });
  t.equal(nsDataSet.authors.size, 1, "should have 1 author: John Doe (after the 2nd contribution");
  t.equal(nsDataSet.authors.get("John Doe").count, 2, "should have 1 author: John Doe (2nd time)");

  t.end();
});

tap.test("NodeSecureDataSet.build", (t) => {
  const nsDataSet = new NodeSecureDataSet();
  nsDataSet.rawEdgesData = [
    { id: 1, text: "item 1" },
    { id: 2, text: "item 2" },
    { id: 3, text: "item 3" }
  ];
  nsDataSet.rawNodesData = [
    { from: 1, to: 2, id: "A" },
    { from: 2, to: 3, id: "B" }
  ];
  const builtData = nsDataSet.build();

  t.equal(builtData.nodes.length, 2, "should have 2 nodes");
  t.equal(builtData.edges.length, 3, "should have 3 edges");

  t.end();
});
