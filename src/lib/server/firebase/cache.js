/**
 *
 * My implementation of an LRU Cache for js database purposes
 * Utilizes dll
 *
 */
let consts = {
  limits: {},
};

let cache = {};

// Moves a node to the front of the its corresponding section
function update(store, key) {
  if (key === cache[store].head) {
    return;
  } else if (key === cache[store].tail) {
    cache[store].tail = cache[store][key].next;
    cache[store][cache[store].tail].prev = null;
    cache[store][key].prev = cache[store].head;
    cache[store][key].next = null;
    const old_head = cache[store].head;
    cache[store].head = key;
    cache[store][old_head].next = key;
    return;
  } else {
    const old_prev = cache[store][key].prev;
    const old_next = cache[store][key].next;
    cache[store][old_prev].next = old_next;
    cache[store][old_next].prev = old_prev;
    cache[store][key].prev = cache[store].head;
    cache[store][key].next = null;
    const old_head = cache[store].head;
    cache[store].head = key;
    cache[store][old_head].next = key;
    return;
  }
}

// Adds a new section to the cache with a given limit of nodes
export function add_section(name, limit) {
  if (cache[name] !== undefined) {
    throw new Error(`Attempt to add section that already exists: ${name}`);
  } else if (limit < 10) {
    throw new Error(
      `Limit for new lru cache entry must be at least 10: ${limit}`,
    );
  }
  consts.limits[name] = limit;
  cache[name] = {
    head: "0",
    tail: "0",
    size: 1,
    0: {
      prev: null,
      next: null,
    },
  };
}
add_section("users", 100);
add_section("auths", 1000);
add_section("lists", 100);

// Adds a node to the front of its corresponding section
/**
 * 
 * @param {string} store 
 * @param {string} key 
 * @param {any} value 
 */
export function add_item(store, key, value) {
  if (cache[store] === undefined) {
    throw new Error(`Attempt to add to non-existent section: ${store}`);
  } else if (cache[store][key] !== undefined) {
    throw new Error(`Attempt to add already existing key: ${key}`);
  }
  const old_head = cache[store].head;
  cache[store].head = key;
  cache[store][key] = {
    next: null,
    prev: old_head,
    ...value,
  };
  cache[store][old_head].next = key;
  cache[store].size++;
  if (cache[store].size > consts.limits[store]) {
    const old_tail = cache[store].tail;
    cache[store].tail = cache[store][old_tail].next;
    cache[store][cache[store].tail].prev = null;
    delete cache[store][old_tail];
  }
}

// Getn a node from the cache
export function get_item(store, key) {
  if (cache[store] === undefined) {
    throw new Error(`Attempt to get from non-existent section: ${store}`);
  } else if (cache[store][key] === undefined) {
    throw new Error(`Attempt to get non-existent key: ${key}`);
  }
  update(store, key);
  let ret = {};
  for (let i in cache[store][key]) {
    if (i === "next" || i === "prev") continue;
    ret[i] = cache[store][key][i];
  }
  return ret;
}

export function remove_item(store, key) {
  if (cache[store] === undefined) {
    throw new Error(`Attempt to remove from non-existent section: ${store}`);
  } else if (cache[store][key] === undefined) {
    throw new Error(`Attempt to remove non-existent key: ${key}`);
  }
  // Remove from dll
  const old_prev = cache[store][key].prev;
  const old_next = cache[store][key].next;

  if (key === cache[store].tail) {
    cache[store].tail = old_next;
    cache[store][old_next].prev = null;
    cache[store].size--;
    delete cache[store][key];
    return;
  }
  if (key === cache[store].head) {
    cache[store].head = old_prev;
    cache[store][old_prev].next = null;
    cache[store].size--;
    delete cache[store][key];
    return;
  }
  cache[store][old_prev].next = old_next;
  cache[store][old_next].prev = old_prev;
  cache[store].size--;
  delete cache[store][key];
  return;
}