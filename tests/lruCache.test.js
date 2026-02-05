const LRUCache = require("../modules/LRUCache");

describe("LRUCache", () => {
  test("returns undefined for missing keys", () => {
    const cache = new LRUCache(2);

    expect(cache.get(1)).toBe(undefined);
    expect(cache.get(99)).toBe(undefined);
  });

  test("stores and retrieves values", () => {
    const cache = new LRUCache(2);

    cache.put(1, 100);
    cache.put(2, 200);

    expect(cache.get(1)).toBe(100);
    expect(cache.get(2)).toBe(200);
  });

  test("evicts least recently used item when capacity exceeded", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3); // evicts key 1

    expect(cache.get(1)).toBe(undefined);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
  });

  test("get updates recent", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);

    cache.get(1);      // 1 becomes most recent
    cache.put(3, 3);   // evicts key 2

    expect(cache.get(2)).toBe(undefined);
    expect(cache.get(1)).toBe(1);
    expect(cache.get(3)).toBe(3);
  });

  test("put updates value and recent", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10); // update existing

    cache.put(3, 3); // evicts key 2

    expect(cache.get(1)).toBe(10);
    expect(cache.get(2)).toBe(undefined);
    expect(cache.get(3)).toBe(3);
  });

  test("works with capacity = 1", () => {
    const cache = new LRUCache(1);

    cache.put(1, 1);
    cache.put(2, 2);

    expect(cache.get(1)).toBe(undefined);
    expect(cache.get(2)).toBe(2);
  });

  test("allows overwriting same key repeatedly", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(1, 5);
    cache.put(1, 10);

    expect(cache.get(1)).toBe(10);
  });

  test("throws if key is string", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    expect(() => cache.put("b", 2)).toThrow();

    expect(cache.get(1)).toBe(1);
  });

  test("throws if capacity <= 0", () => {
    expect(() => new LRUCache(0)).toThrow();
    expect(() => new LRUCache(-1)).toThrow();
  });
});