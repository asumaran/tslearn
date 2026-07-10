// https://www.greatfrontend.com/questions/javascript/classnames-ii?practice=practice&tab=coding
// ok este es el primer ejercicio que hago despues de vibecodear por meses, asi que no me pidan mucho
export default function classNames(...args: unknown[]) {
  const result = new Set();

  function add(arg: unknown) {
    if (!arg) {
      return;
    }
    if (typeof arg === 'string' || typeof arg === 'number') {
      result.add(arg.toString());
    } else if (Array.isArray(arg)) {
      // add(arg);
      arg.forEach(add);
    } else if (typeof arg === 'function') {
      result.add(arg().toString());
    } else if (typeof arg === 'object') {
      for (const [k, val] of Object.entries(arg)) {
        if (val) {
          result.add(k);
        } else {
          result.delete(k);
        }
      }
    }
  }

  args.forEach(add);

  return [...result].join(' ');
}

// console.log(classNames('foo', 'foo', 'foo'));
// console.log(classNames('foo', 'bar', 'baz'));
// console.log(classNames({ foo: true }, { foo: true }, { bar: true }));
// console.log(classNames([]));
// console.log(classNames({ foo: true, bar: true }, { foo: false }));
// console.log(classNames('foo', () => 'bax'));
// console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // bar 1
console.log(classNames(() => 1, '1')); // '1'
