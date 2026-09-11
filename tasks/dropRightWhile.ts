/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
export default function dropRightWhile(array, predicate) {
  // const copyArr = [...array];
  // let count = array.length;
  // console.log(copyArr);
  // while (count > 0) {
  //   console.log(count);
  //   const last = copyArr.at(-1);
  //   console.log({ count });
  //   if (!predicate(last, count - 1, array)) {
  //     break;
  //   }
  //   copyArr.pop();
  //   count--;
  // }
  // return copyArr;
  let count = array.length - 1;
  while (count >= 0 && predicate(array[count], count, array)) {
    console.log({ count });
    count--;
  }

  return array.slice(0, count + 1);
}

// Example 1: Basic usage
console.log(
  dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 3)
);
// => [1, 2, 3]
// Explanation: Starts from right (5). 5 > 3 (true, drop). 4 > 3 (true, drop). 3 > 3 (false, stop). Returns [1, 2, 3].

// Example 2: Predicate always true
console.log(dropRightWhile([1, 2, 3], (value, _index, _array) => value < 6));
// // => []
// // Explanation: 3 < 6 (true, drop). 2 < 6 (true, drop). 1 < 6 (true, drop). Returns empty array.
//
// // Example 3: Predicate always false
// console.log(
//   dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6)
// );
// // => [1, 2, 3, 4, 5]
// // Explanation: 5 > 6 (false, stop immediately). Returns the original array slice.
//
// Example 4: Using the `index` argument
console.log(
  dropRightWhile([1, 2, 3, 4, 5], (_value, index, _array) => index > 2)
);
// // => [1, 2, 3]
// // Explanation: Starts at index 4. 4 > 2 (true, drop). Index 3. 3 > 2 (true, drop). Index 2. 2 > 2 (false, stop). Returns [1, 2, 3].
//
// // Example 5: Using the `array` argument
// console.log(
//   dropRightWhile([10, 11, 12, 4, 5], (value, _index, array) => value < array[1])
// );
// // => [10, 11, 12]
// // Explanation: array[1] = 11. 5 < 11 (true, drop). 4 < 11 (true, drop). 12 < 11 (false, stop). Returns [10, 11, 12].
