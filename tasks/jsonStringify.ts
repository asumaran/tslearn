export default function jsonStringify(value: unknown): string {
  function iterate(value: unknown): string {
    let result = '';

    const isObject =
      Object.prototype.toString.call(value) === '[object Object]';

    if (typeof value === 'string') {
      return `"${value}"`;
    }

    if (
      typeof value === 'number' ||
      value === null ||
      typeof value === 'boolean'
    ) {
      return `${value}`;
    }

    if (isObject) {
      result += '{';
      const t = [];
      for (const key in value) {
        t.push(`"${key}":${iterate(value[key])}`);
      }
      result += t.join(',');
      result += '}';
    } else if (Array.isArray(value)) {
      // console.log('value', value);
      result += '[';
      result += value.map(iterate).join(',');
      result += ']';
    }

    return result;
  }

  return `${iterate(value)}`;
}

// console.log(jsonStringify({ foo: 'bar' })); // '{"foo":"bar"}'
// console.log(jsonStringify({ foo: 'bar', bar: [1, 2, 3] })); // '{"foo":"bar"}'
console.log(jsonStringify({ name: 'John', age: 30 })); // '{"foo":"bar"}'
