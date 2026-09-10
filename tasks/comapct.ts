/**
 * @param {Array<unknown>} array The array to compact.
 * @return {Array<unknown>} Returns the new array of filtered values.
 */
export default function compact(array) {
  return array.filter(Boolean);
}

console.log(compact([0, 1, false, 2, '', 3, null])); // => [1, 2, 3]
console.log(compact(['hello', 123, [], {}])); // => ['hello', 123, [], {}]
console.log(compact([1, , null, 2, , 3])); // => [1, 2, 3]
