const LRUCache = require("./modules/LRUCache");

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2, 1000);

console.log(cache.get(1)); // dsiplay 1
console.log(cache.get(2)); // display 2 when not expired
console.log('...loading')

setTimeout(() => {
  
  cache.put(3, 3);
  cache.put(4, 4);
  console.log(cache.get(1)); // evicted due to capacity
  console.log(cache.get(2)); // should be expired
  console.log(cache.get(3)); // display 3
  console.log(cache.get(4)); // display 4
  
  console.log(`total size: ${cache.size()}`); // display total cache count
  cache.printAll(); // prints all cache values
}, 1500);
