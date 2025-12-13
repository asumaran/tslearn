// export default function arrayProductExcludingCurrent(
//   numbers: number[]
// ): number[] {
//   const n = numbers.length;

//   // Create prefix and suffix arrays
//   const prefix: number[] = new Array(n).fill(1);
//   const suffix: number[] = new Array(n).fill(1);
//   const result: number[] = new Array(n).fill(1);

//   // Step 1: Fill prefix array
//   // prefix[0] = 1; // First element has no elements to its left
//   // o sea lo que esto hace es crear el product del numero con su precedecesor
//   // para el caso [1, 2, 3] prefix se rellenaria de modo tal:

//   // prefix:
//   //   0: 1  // empieza con uno
//   //   1: prefix[0] * numbers[0]  1 * 1 = 1
//   //   2: prefix[1] * numbers[1]  1 * 2 = 2
//   // prefix: [1, 1, 3];
//   for (let i = 1; i < n; i++) {
//     prefix[i] = prefix[i - 1] * numbers[i - 1];
//   }
//   console.log('prefix', prefix);
//   // Step 2: Fill suffix array
//   // suffix[n - 1] = 1; // Last element has no elements to its right
//   // y aqui seria lo mismo excepto que empezamos a acumular desde el final
//   // suffix:
//   //    2: 1 // termina con uno
//   //    1: suffix[2] * numbers[2]  1 * 3 = 3
//   //    0: suffix[1] * numbers[1]  3 * 2 = 6
//   // suffix: [6, 3, 1]
//   for (let i = n - 2; i >= 0; i--) {
//     suffix[i] = suffix[i + 1] * numbers[i + 1];
//   }
//   console.log('suffix', suffix);

//   // Step 3: Calculate result array by combining prefix and suffix
//   // El resultado se calcularia multiplicando el sufijo con el prefijo en el index del numero que se desea calcular el producto
//   // esto obviaria por supuesto el numero que se encuentra en dado index.
//   // result:
//   //  0: 1*6 = 6
//   //  1: 1*3 = 3
//   //  2: 2*1 = 2
//   // Cada posición:
//   // •	prefix ignora el número actual porque solo mira a la izquierda
//   // •	suffix ignora el número actual porque solo mira a la derecha
//   // •	al multiplicarlos, obtienes “todos menos yo”
//   for (let i = 0; i < n; i++) {
//     result[i] = prefix[i] * suffix[i];
//   }

//   // Step 4: Convert -0 to 0 if needed
//   for (let i = 0; i < n; i++) {
//     if (result[i] === -0) {
//       result[i] = 0;
//     }
//   }

//   return result;
// }

// Approach 2
// lo que entiendo es que con el primer form se pone los resultados de la multiplicacion acumulada empezando desde la izquierda hasta el item anterior del item actual.
// y en el segundo for lo que se hace es iterar "en reversa" empezando desde el final del array de numeros.
// esto es para en un solo for hacer el calculo del resultado del item actual
// (porque tenemos el resultado de la multiplicacion acumulada desde el item actual hacia la izquierda y el acumulado del item actual hacia la derecha que empieza con 1 si es el final, por eso se empieza a  desde numbers.length-1 por que el acumulado empieza en 1)
// entonces para el siguiente item ya tenemos el calculo del producto acumulado de los items desde el item sigueinte al final.
// entonces si tienes el resultado de la multiplicacion de los items hacia la izquierda en result[i], estsaria perfecto simplemente reasignar con el producto del valor actual con el valor de la multiplicacion de los items de la derecha
// al final del loop se asigna rightProduct = rightProduct * numbers[i] para que en el sigueinte loop, rightProduct sea correcto la acumulacion de multiplicacion

// export default function arrayProductExcludingCurrent(
//   numbers: number[]
// ): number[] {
//   // Get the length of the input array
//   const length = numbers.length;

//   // Initialize the result array
//   const result: number[] = new Array(length).fill(1);

//   // Calculate products of all elements to the left of each index
//   // en el caso [1, 2, 3] sería
//   // result[0] = 1 // empieza con 1
//   // result[1] = 1 * 1 = 1
//   // result[2] = 2 * 1 = 2
//   // result = [1, 1, 2]
//   for (let i = 1; i < length; i++) {
//     // result[i] contains the product of all elements to the left of index 'i'
//     result[i] = numbers[i - 1] * result[i - 1];
//   }

//   // Variable to hold the product of all elements to the right
//   let rightProduct = 1;
//   for (let i = length - 1; i >= 0; i--) {
//     // Multiply the right product with the current result
//     result[i] *= rightProduct;
//     // Update rightProduct with the current element
//     rightProduct *= numbers[i];
//   }

//   // Convert -0 or +0 to normal 0
//   for (let i = 0; i < length; i++) {
//     if (result[i] === -0) {
//       result[i] = 0;
//     }
//   }

//   return result;
// }

export default function arrayProductExcludingCurrent(
  numbers: number[]
): number[] {
  const result = new Array(numbers.length).fill(1);

  // 1. acumular los products desde la izquierda
  // empezamos desde 1 para poder acceder al item anterior ademas porque el resultado empieza desde 1, el numero neutro en la multiplicacion.
  for (let i = 1; i < numbers.length; i++) {
    result[i] = numbers[i - 1] * result[i - 1];
  }

  // 2. calcular el resultado para i basado en el resultado de la izquierda * rightProduct
  let rightProduct = 1;
  for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(i, result[i]);
    result[i] = result[i] * rightProduct;
    rightProduct = rightProduct * numbers[i];
  }

  return result;
}

console.log(arrayProductExcludingCurrent([2, 4, 6])); // 24, 12, 8
// console.log(arrayProductExcludingCurrent([0, 0, -1, 1]));
