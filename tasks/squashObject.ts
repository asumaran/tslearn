export default function squashObject(obj: Object): Object {
  function iterator(val, path, output) {
    for (const [k, v] of Object.entries(val)) {
      if (typeof v === 'object' && v !== null) {
        iterator(v, path.concat(k), output);
      } else {
        output[path.concat(k).filter(Boolean).join('.')] = v;
      }
    }
  }

  let result = {};
  iterator(obj, [], result);
  return result;
}

const object = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};

console.log(squashObject(object)); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }
