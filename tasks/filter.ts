// https://www.greatfrontend.com/questions/javascript/array-filter

/**
 * @template T
 * @param {(value: T, index: number, array: Array<T>) => boolean} callbackFn
 * @param {unknown} [thisArg]
 * @returns {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const result = [];
  const len = this.length;
  for (let i = 0; i < len; i++) {
    const val = this[i];
    if (Object.hasOwn(this, i) && callbackFn.call(thisArg, val, i, this)) {
      result.push(val);
    }
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter((value) => value % 2 == 0)); // [2, 4]

const isThisProductEven = function (this: any, element: number) {
  return (element * this) % 2 === 0;
};

console.log([1, 2, 3, 4].myFilter(isThisProductEven)); // []
