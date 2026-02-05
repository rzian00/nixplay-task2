class LRUCacheData {
  constructor(key, value, expiresAt) {
    this.key = key;
    this.value = value;
    this.expiresAt = expiresAt;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity = 10, defaultTTL = 60000) {
    if (capacity <= 0) 
      throw new Error('Invalid capacity atleast min 1.');

    this.capacity = capacity;
    this.defaultTTL = defaultTTL;
    this.cache = new Array();
    this.head = null;
    this.tail = null;
  }

  _addItem(item) {
    item.prev = null;
    item.next = this.head;
    if (this.head) this.head.prev = item;

    this.head = item;
    if (!this.tail) this.tail = item;
  }

  _removeItem(item) {
    if (item.prev) item.prev.next = item.next;
    else this.head = item.next;

    if (item.next) item.next.prev = item.prev;
    else this.tail = item.prev;
  }

  _removeCache() {
    if (this.tail) {
      const idx = this.cache.indexOf(this.tail);
      if (idx > -1)
        this.cache.splice(idx, 1);

      this._removeItem(this.tail);
    }
  }

  _moveItem(item) {
    if (item === this.head) return;
    this._removeItem(item);
    this._addItem(item);
  }

  _checkExpiration(item) {
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this._removeItem(item);
      this.cache.splice(this.cache.indexOf(item), 1);
      return true;
    }
    return false;
  }

  _validateKey(key) {
    if (typeof key !== "number")
      throw new Error("Invalid key type must be integer number");

    return;
  }

  get(key) {
    this._validateKey(key);

    const item = this.cache.find((it) => it.key === key);
    if (!item) return undefined;

    if (this._checkExpiration(item)) return undefined;
    this._moveItem(item);
    return item.value || -1;
  }

  put(key, value, ttl = this.defaultTTL) {
    this._validateKey(key);

    let item = this.cache.find((it) => it.key === key);
    const expiresAt = Date.now() + ttl;

    if (item) return this._moveItem({ ...item, value, expiresAt });

    item = new LRUCacheData(key, value, expiresAt);
    this.cache.push(item);
    this._addItem(item);

    if (this.cache.length > this.capacity) this._removeCache();
  }

  size() {
    return this.cache.length;
  }

  printAll() {
    console.log(this.cache);
  }
}

module.exports = LRUCache;
