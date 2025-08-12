export default function deepClone<T>(value: T): T {
  // si no es objeto será manejado más abajo.
  // si es null (ya que null es object y no entraria en este if),
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  // si es array aplicamos deepclone por cada item
  if (Array.isArray(value)) {
    return value.map((v) => {
      return deepClone(v);
    }) as T;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      return [key, deepClone(item)];
    })
  ) as T;
}

const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

console.log({ clonedObj1 });

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

console.log({ clonedObj2 });

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
console.log('clonedObj2', clonedObj2);
clonedObj2.foo[0].bar; // Should still be 'baz'.
