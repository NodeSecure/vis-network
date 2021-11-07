# NodeSecureDataSet
Class to load, parse and format NodeSecure scanner payload.

```js
const secureDataSet = new NodeSecureDataSet();

// Init by searching payload and flags on a remote API
await secureDataSet.init();

// Init by providing payload and flags
await secureDataSet.init(payload, window.FLAGS);
```

The .build() method will return Vis.js nodes and edges DataSet.

```js
const { nodes, edges } = secureDataSet.build();
```

> The method is automatically called in NodeSecureNetwork class constructor

## Data

The .init() method hydrate a lot of properties of the class.

```js
this.warnings = [];
this.packages = [];
this.linker = new Map();
this.authors = new Map();
this.extensions = Object.create(null);
this.licenses = { Unknown: 0 };
this.dependenciesCount = 0;
this.size = 0;
this.indirectDependencies = 0;
````
