export default function findMissingNumberInSequence(numbers: number[]): number {
  // Approach 1
  // Se me ocurre ordenar primero el array de numeros y podria hacerse algo como
  // iterar los numeros y decir que si el sigueinte no es current + 1 entonces ese es el numero.
  // numbers.sort((a, b) => a - b);
  // for (let i = -1; i < numbers.length; i++) {
  //   if (i + 1 !== numbers[i + 1]) {
  //     return i + 1;
  //   }
  // }
  // return -1;

  // Approach 2
  // sumar ambos series de numeros, la pasada y la esperada
  const actualSum = numbers.reduce((prev, curr) => prev + curr, 0);

  let expectedSum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    expectedSum += i;
  }

  return expectedSum - actualSum;
}

const test = [3, 0, 4, 2, 1];
console.log(findMissingNumberInSequence(test));
