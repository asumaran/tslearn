export default function mostCommonElements(
  numbers: number[],
  k: number
): number[] {
  // apporach con buckets.
  const frequencyMap: Map<number, number> = new Map();

  numbers.forEach((n) => {
    frequencyMap.set(n, (frequencyMap.get(n) || 0) + 1);
  });

  // console.log(frequencyMap);

  // +1 porque la frecuencia no es 0-based
  const buckets: number[][] = new Array(numbers.length + 1)
    .fill(null)
    .map(() => []);
  // console.log({ heap });

  for (const [num, frequency] of frequencyMap) {
    // console.log({ x, y });
    buckets[frequency].push(num);
  }

  // console.log(heap);

  // ahora necesitamos obtener lo k primeros items, como es los mas frecuentes
  // empezamos a iterar desde el más alto
  const result: number[] = [];
  for (let i = numbers.length; i >= 0 && k > 0; i--) {
    // console.log({ i });
    if (buckets[i].length > 0) {
      for (const num of buckets[i]) {
        // console.log('xxxx', x);
        result.push(num);
        k--;
        if (k === 0) {
          return result;
        }
      }
    }
  }

  return result;
}

console.log(mostCommonElements([1, 1, 1, 1, 2, 3, 3], 2));
