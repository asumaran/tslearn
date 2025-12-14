export default function pairSum(numbers: number[], target: number): number[] {
  const hash: Record<number, number> = {};
  numbers.forEach((v, k) => (hash[v] = k));

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];
    // debemos usar in en vez de hash[complement]
    // porque de ser cero el valor no pasa la evaluacion al ser evaluado como falsy
    if (complement in hash && hash[complement] !== i) {
      return [i, hash[complement]];
    }
  }

  return [];
}

// Input: numbers = [0,7,1,9], target = 7
// Output: [0,1]

// este caso retorna [1, 1] sin el check adicional
// pero con el check retorna [2, 3] correctamente.
const numbers = [1, -174, -164, -184];
const target = -348;

console.log(pairSum(numbers, target));
