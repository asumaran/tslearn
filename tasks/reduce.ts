interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ): U;
}

// Un reducer lo que hace es como su nombre lo dice, es "reducir"
// un array a un solo valor. Para esto, el reducer recibe una funcion
// el cual se encargará de recibir:
// 1. el valor anterior, undefined para el primero.
// 2. el valor actual  (el cual seria el valor inicial para la primera iteracion).
// 3. el index actual del item de array que se esta procesndo.
// 4. y como ultimo se pasa el array original completo.
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let acc,
    currentValue,
    previousValue = initialValue,
    invokeCallback = true,
    startAt = 0;

  // Si no se pasó initialValue
  if (initialValue === undefined) {
    // Si el array está vacío → no hay valor inicial ni elementos → error
    // Ejemplo:
    // [].myReduce((a, b) => a + b); // ❌ TypeError
    if (this.length === 0) {
      throw new TypeError();
    }
    // Si el array tiene solo 1 elemento → ese elemento es el resultado final
    // Ejemplo:
    // [5].myReduce((a, b) => a + b); // ✅ 5
    else if (this.length === 1) {
      return this[0];
    }
    // Si hay más de un elemento → usar el primer elemento como previousValue
    // y empezar el bucle desde el índice 1
    // Ejemplo:
    // [1, 2, 3].myReduce((a, b) => a + b); // ✅ 6
    else {
      startAt = 1;
      previousValue = this[0];
    }
  } else {
    // Si se pasó initialValue y el array está vacío → devolver initialValue directamente
    // Ejemplo:
    // [].myReduce((a, b) => a + b, 10); // ✅ 10
    if (this.length === 0) {
      return initialValue;
    }
  }

  if (invokeCallback) {
    for (let i = startAt; i < this.length; i++) {
      // Saltar elementos que son undefined en posiciones vacías del array (sparse arrays)
      // Ejemplo:
      // [1, , 3].myReduce((a, b) => a + b); // ✅ 4
      if (this[i] === undefined) {
        continue;
      }

      currentValue = this[i];
      acc = callbackFn(previousValue, currentValue, i, this);
      previousValue = acc;
    }
  }

  return acc;
};

const add = (prev: any, curr: any) => prev + curr;
const subtract = (prev: number, curr: number) => prev - curr;
const sumOfSquares = (prev: any, curr: any, index: number, array: Array<any>) =>
  prev + curr * array[index];
const getMax = (a, b) => Math.max(a, b);
const combineObj = (prev: Object, curr: Object) => ({ ...prev, ...curr });

// console.log([1, 2, 3].myReduce((prev, curr) => prev + curr, 0)); // 6
// console.log([1, 2, 3].myReduce((prev, curr) => prev + curr, 4)); // 10

// console.log([].myReduce(add, 0));
// console.log([].myReduce(subtract, 0));

// console.log([].myReduce(add)); // should throw

// console.log([1, 2, 3].myReduce(add)); // 6;
// console.log([-1, -3, 4].myReduce(sumOfSquares, 0)); // 26

// // callback is invoked for each element in the array starting at index 0
// console.log([1, 100].reduce(getMax, 50)); // 100
// console.log([50].reduce(getMax, 10)); // 50

// // callback is invoked once for element at index 1
// console.log([1, 100].reduce(getMax)); // 100

// // callback is not invoked
// console.log([50].reduce(getMax)); // 50
// console.log([].reduce(getMax, 1)); // 1

// console.log([].reduce(getMax)); // TypeError

// console.log([{ foo: 1 }, { bar: 2 }].myReduce(combineObj)); // { foo: 1,bar: 2 }
// console.log([{ foo: 1 }, { bar: 2 }].myReduce(combineObj, {})); // { foo: 1, bar: 2 }

console.log([1, 2, , 3].myReduce(add)); // 6
console.log([-1, -3, 4, , ,].myReduce(sumOfSquares, 0)); // 26
