type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  const res = [];

  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      // si no uso el spread estaria metiendo el array al resultado, o sea lo mismo que nada
      // ❌ [1, [2, 3], 4]
      // con el spread lo que hace es:
      // res.push(2, 3);
      res.push(...flatten(value[i]));
    } else {
      res.push(value[i]);
    }
  }

  return res;
}

console.log(flatten([1, [2], 3]));
