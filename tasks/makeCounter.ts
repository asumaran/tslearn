/**
 * @param {number} [initialValue=0]
 * @returns {() => number}
 */
export default function makeCounter(initialValue = 0) {
  let sum = initialValue;
  let firstCall = true;

  return function () {
    sum = firstCall ? sum : sum + 1;
    firstCall = false;
    return sum;
  };
}

const counter1 = makeCounter();
console.log(counter1()); // 0
console.log(counter1()); // 0
console.log(counter1()); // 0

const counter = makeCounter(5);
console.log(counter()); // 0
console.log(counter()); // 0
console.log(counter()); // 0
