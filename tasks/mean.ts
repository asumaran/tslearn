export default function mean(arr: number[]) {
  const result = arr.reduce((prev: number, curr: number, currIndex: number) => {
    return curr + prev;
  }, 0);
  return result / arr.length;
}

console.log(mean([1, 2]));
