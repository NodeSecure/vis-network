# NodeSecureNetwork

```js
const nsn = new NodeSecureNetwork(secureDataSet);

nsn.focusNodeById(0); // 0 is root Node
nsn.focusNodeByName("express"); // Focus by package name

// Search for neighbours id of root Node
const ids = [...nsn.searchForNeighbourIds(0)];
console.log(ids);
```
