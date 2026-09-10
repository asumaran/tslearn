/**
 * @template T
 * @param {Array<T>} array
 * @param {Array<T>} values
 * @returns {Array<T>}
 */
export default function difference(array, values) {
  return array.filter((val) => {
    return !values.includes(val);
  });
}

console.log(difference([1, 2, 3], [2, 3])); // => [1]
console.log(difference([1, 2, 3, 4], [2, 3, 1])); // => [4]
console.log(difference([1, NaN, 2], [NaN])); // => [1, 2]
console.log(difference([1, 2, 3], [2, 3, 1, 4])); // => []
console.log(difference([1, , 3], [1])); // => [3]
