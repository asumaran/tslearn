// export default function mapAsyncLimit<T, U>(
//   iterable: Array<T>,
//   callbackFn: (value: T) => Promise<U>,
//   size: number = Infinity
// ): Promise<Array<U>> {
//   return new Promise(async (resolve, reject) => {
//     const results = [];
//     let nextItem = 0;
//     let resolved = 0;

//     if (iterable.length === 0) {
//       resolve(results);
//       return;
//     }

//     async function doPromise(index: number) {
//       nextItem++;
//       try {
//         results[index] = await callbackFn(iterable[index]);
//         resolved++;

//         if (resolved === iterable.length) {
//           resolve(results);
//           return;
//         }

//         if (nextItem < iterable.length) {
//           doPromise(nextItem);
//         }
//       } catch (e) {
//         reject(e);
//       }
//     }

//     for (let i = 0; i < Math.min(iterable.length, size); i++) {
//       doPromise(i);
//     }
//   });
// }

// better approach IMO
export default async function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  // Sin límite: procesar todos los elementos concurrentemente
  if (!size) {
    return Promise.all(iterable.map(callbackFn));
  }

  const results: U[] = new Array(iterable.length);
  let index = 0; // Variable compartida entre todos los workers

  const processNext = async (): Promise<void> => {
    // Cada worker ejecuta esta función UNA SOLA VEZ
    // Pero el while interno corre MÚLTIPLES iteraciones

    while (index < iterable.length) {
      // 1. Toma el siguiente elemento disponible (atomic operation)
      const currentIndex = index++;

      // 2. Procesa el elemento y ESPERA que termine
      //    ↓ EL AWAIT PAUSA EL WHILE HASTA QUE TERMINE ESTA PROMESA
      results[currentIndex] = await callbackFn(iterable[currentIndex]);
      //    ↑ Solo cuando termine, vuelve al while para tomar el siguiente
    }

    // 3. Cuando no hay más elementos, sale del while
    //    y la función termina (resolviendo la promesa del worker)
  };

  // Crear exactamente 'size' workers que corren EN PARALELO
  // Cada worker es UNA promesa de larga duración
  const workers = Array(Math.min(size, iterable.length))
    .fill(null)
    .map(() => processNext()); // Cada llamada crea un worker independiente

  // Esperar que TODOS los workers terminen (cuando no hay más elementos)
  await Promise.all(workers);

  return results;
}

const asyncIdentity = (x: string) => Promise.resolve(x.toUpperCase());

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ['foo', 'bar', 'qux', 'quz'],
  asyncIdentity,
  2
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
