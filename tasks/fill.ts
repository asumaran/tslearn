/**
 * @template T
 * @param {Array<T>} array - The array to fill.
 * @param {T} value - The value to fill the array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @return {Array<T>} Returns the filled array.
 */
export default function fill(array, value, start = 0, end = array.length) {
  const startT = Math.max(
    0,
    start < 0 ? array.length + start : Math.min(start, array.length)
  );
  const endT = Math.min(
    array.length,
    end < 0 ? Math.max(0, array.length + end) : end
  );
  // console.log({ startT });
  // console.log({ endT });
  for (let i = 0; i < array.length; i++) {
    if (i >= startT && i < endT) {
      array[i] = value;
    }
  }
  return array;
}
console.log(fill([1, 2, 3], 'a')); // ['a', 'a', 'a']
console.log(fill([4, 6, 8, 10], '*', 1, 3)); // [4, '*', '*', 10]

// out-of-bounds indices
console.log(fill([4, 6, 8, 10, 12], '*', 1, 8)); // [4, '*', '*', '*', '*']
console.log(fill([4, 6, 8, 10, 12], '*', 8, 10)); // [4, 6, 8, 10, 12]
//
// negative in-bounds indices
console.log(fill([4, 6, 8, 10, 12], '*', -3, -1)); // [4, 6, '*', '*', 12]

// negative out-of-bounds indices
console.log(fill([4, 6, 8, 10, 12], '*', -10, 2)); // ['*', '*', 8, 10, 12]
console.log(fill([4, 6, 8, 10, 12], '*', -10, -8)); // [4, 6, 8, 10, 12]

// ┌─────┬───────────────────────┬─────────────┬───────────┐
// │  #  │      Input            │ start final │ end final │
// ├─────┼───────────────────────┼─────────────┼───────────┤
// │  1  │ fill([1,2,3], 'a')    │      0      │     3     │
// │  2  │ fill([...], '*',1,3)  │      1      │     3     │
// │  3  │ fill([...], '*',1,8)  │      1      │     5     │
// │  4  │ fill([...], '*',8,10) │      5      │     5     │
// │  5  │ fill([...], '*',-3,-1)│      2      │     4     │
// │  6  │ fill([...], '*',-10,2)│      0      │     2     │
// │  7  │ fill([...], '*',-10,-8)│     0      │     0     │
// └─────┴───────────────────────┴─────────────┴───────────┘
