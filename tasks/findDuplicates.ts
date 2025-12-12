export default function findDuplicates(numbers: number[]): boolean {
  // se me ocurre dos formas de solucionar esto.
  // 1. crear un set donde se acumule los numeros y verificar antes de agregar el nuevo numero si es que ya existe
  // 2. hacer un lastIndexOf y verificar si el index es mayor que el index actual del numero

  // Approach 1
  // const unique = new Set();
  // for (let i = 0; i < numbers.length; i++) {
  //   if (unique.has(numbers[i])) {
  //     return true;
  //   } else {
  //     unique.add(numbers[i]);
  //   }
  // }
  // return false;

  // Approach 2
  for (let i = 0; i < numbers.length; i++) {
    if (numbers.lastIndexOf(numbers[i]) > i) {
      return true;
    }
  }
  return false;
}

// Input: numbers = [5,7,1,3]
// Output: false
// Explanation: All elements in the array are unique.

const test = [5, 7, 1, 3, 3];
console.log(findDuplicates(test));
