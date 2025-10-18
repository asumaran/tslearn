export default function deepOmit(val: unknown, keys: Array<string>): unknown {
  let result = val;
  if (isIterable(val)) {
    result = Array.isArray(val) ? [] : {};
  } else {
    return result;
  }
  const entries = Object.entries(val);
  if (entries.length === 0) {
    return result;
  }
  for (let i = 0; i < entries.length; i++) {
    const currKey = entries[i][0];
    if (!keys.includes(currKey)) {
      const currVal = entries[i][1];
      if (isIterable(currVal)) {
        result[currKey] = deepOmit(currVal, keys);
      } else {
        result[currKey] = currVal;
      }
    }
  }
  return result;
}

function isIterable(val: unknown) {
  const type = Object.prototype.toString.call(val);
  return ['[object Object]', '[object Array]'].includes(type);
}

// console.log(deepOmit({}, ['b'])); // { a: 1, c: 3 }
// console.log(deepOmit({ a: 1, b: 2, c: 3 }, ['b'])); // { a: 1, c: 3 }

const dataWithArray = {
  a: 1,
  b: [{ c: 2 }, [3]],
  c: [[{ a: 2, b: 3 }]],
};
console.log(JSON.stringify(deepOmit(dataWithArray, ['b', 'e'])));
// {
//   a: 1,
//   c: [[{ a: 2 }]],
// }
