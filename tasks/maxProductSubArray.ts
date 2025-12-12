export default function maxProductSubArray(numbers: number[]): number {
  const groups = [];
  let max = 0;
  for (let i = 0; i < numbers.length; i++) {
    const subGroup = [];
    let acc = 1;
    for (let j = i; j < numbers.length; j++) {
      // const sub = [];
      acc = acc * numbers[j];
      console.log('numbers[j]', numbers[j]);
      // for (let k = i; k <= j; k++) {
      //   // sub.push(numbers[k]);
      // }
      max = Math.max(acc, max);
      // groups.push(sub);
    }
    console.log('-----');
  }
  return max;
}

const test = [1, 2, 3];
console.log(maxProductSubArray(test));
