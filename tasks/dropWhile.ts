/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
export default function dropWhile(array, predicate) {
  let index = 0;
  while (index <= array.length && predicate(array[index], index, array)) {
    index++;
  }
  return array.slice(index);
}

console.log(dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 3));
// => [3, 4, 5]
// Explanation: Starts from left (1). 1 < 3 (true, drop). 2 < 3 (true, drop). 3 < 3 (false, stop). Returns [3, 4, 5].

console.log(dropWhile([1, 2, 3], (value, _index, _array) => value < 6));
// => []
// Explanation: Starts from left (1). 1 < 6 (true, drop). 2 < 6 (true, drop). 3 < 6 (true, drop). Reaches end. Returns [].

console.log(dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6));
// => [1, 2, 3, 4, 5]
// Explanation: Starts from left (1). 1 > 6 (false, stop immediately). Returns [1, 2, 3, 4, 5].

console.log(dropWhile([1, 2, 3, 4, 5], (_value, index, _array) => index < 3));
// => [4, 5]
// Explanation: Starts at index 0. 0 < 3 (true, drop). Index 1. 1 < 3 (true, drop). Index 2. 2 < 3 (true, drop). Index 3. 3 < 3 (false, stop). Returns [4, 5].

console.log(
  dropWhile([4, 5, 12, 10, 11], (value, _index, array) => value < array[2])
);
// => [12, 10, 11]
// Explanation: array[2] is 12. Starts from left (4). 4 < 12 (true, drop). Index 1 (5). 5 < 12 (true, drop). Index 2 (12). 12 < 12 (false, stop). Returns [12, 10, 11].
