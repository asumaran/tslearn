function getType(value: unknown) {
  return Object.prototype.toString.call(value);
}

function shouldDeepCompare(type: string) {
  return type === '[object Array]' || type === '[object Object]';
}

export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  const typeA = getType(valueA);
  const typeB = getType(valueB);

  if (typeA === typeB && shouldDeepCompare(typeA) && shouldDeepCompare(typeB)) {
    const entriesA = Object.entries(valueA as Array<unknown> | Object);
    const entriesB = Object.entries(valueB as Array<unknown> | Object);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(([k, v]) => {
      return (
        Object.hasOwn(valueB as Array<unknown>, k) &&
        deepEqual(v, (valueB as any)[k])
      );
    });
  }

  return Object.is(valueA, valueB);
}

// console.log(deepEqual('foo', 'foo'));
console.log(deepEqual(['a', {}], ['a', {}]));
