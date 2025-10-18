/**
 * Convierte una función basada en callbacks al estilo Node.js en una función que retorna Promesas.
 *
 * Esta utilidad es especialmente útil para trabajar con APIs antiguas que usan el patrón
 * de callback error-first (donde el primer parámetro del callback es el error, y el segundo es el resultado).
 *
 * @template T - Tipo del valor que se resolverá en la Promise
 *
 * @param func - Función original que acepta argumentos y un callback error-first como último parámetro.
 *               El callback debe tener la firma: (err: Error | null, result: T) => void
 * @returns Una nueva función que acepta los mismos argumentos (excepto el callback) y retorna una Promise<T>
 *
 * @example
 * // Función antigua con callback
 * function readFile(path: string, callback: (err: Error | null, data: string) => void) {
 *   // ... lógica de lectura
 *   callback(null, 'file content');
 * }
 *
 * // Convertir a Promise
 * const readFileAsync = promisify<string>(readFile);
 * const data = await readFileAsync('./file.txt'); // data es de tipo string
 */
export default function promisify<T>(
  func: (...args: any[]) => void
): (this: any, ...args: any[]) => Promise<T> {
  // Retornamos una nueva función que envuelve la función original
  return function (this: any, ...args: any[]): Promise<T> {
    // Creamos y retornamos una Promise que manejará la ejecución asíncrona
    return new Promise<T>((resolve, reject) => {
      /**
       * PARTE CRÍTICA: Inyección del callback personalizado
       *
       * La función original espera recibir un callback como último parámetro.
       * Ese callback sigue la convención error-first de Node.js: (err, result) => void
       *
       * Lo que hacemos aquí:
       * 1. Usamos func.call(this, ...) para preservar el contexto (this) original
       *    Esto es crucial cuando la función pertenece a un objeto/clase y utiliza 'this' internamente
       * 2. Pasamos todos los argumentos originales (...args) que recibió la función promisificada
       * 3. Añadimos un callback adicional al final que nosotros controlamos manualmente
       * 4. Este callback captura el error o resultado que la función original genera internamente
       * 5. Según lo que reciba el callback, resolvemos o rechazamos la Promise
       *
       * Flujo de ejecución:
       * - Si la función original encuentra un error: callback(error, null) → reject(error)
       * - Si la función original tiene éxito: callback(null, resultado) → resolve(resultado)
       *
       * Nota: La función original NO sabe que estamos usando Promises. Ella simplemente
       * ejecuta su lógica y llama al callback que le pasamos, sin saber que ese callback
       * está conectado a una Promise.
       */
      func.call(this, ...args, (err: any, result: T) => {
        // Patrón error-first: si hay error, rechazamos la Promise; si no, la resolvemos con el resultado
        return err ? reject(err) : resolve(result);
      });
    });
  };
}

// Example function with callback as last argument
// The callback has the signature `(err, value) => any`
function delayedResolve(cb: Function) {
  setTimeout(() => {
    cb(null, 42);
  }, 10);
}
// retorna una nueva funcion la cual toma como parametro la funcion a la que se va a convertir a promesa
const promisifiedFoo = promisify(delayedResolve);
//
const data = await promisifiedFoo();

console.log('data', data);
