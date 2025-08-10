type ReturnValue<T> = { -readonly [P in keyof T]: Awaited<T[P]> };

export default function promiseAll<T extends readonly unknown[] | []>(
  iterable: T
): Promise<ReturnValue<T>> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve([] as unknown as ReturnValue<T>);
      return;
    }

    const resolvedPromises: unknown[] = [];
    let resolvedCounter = 0;

    iterable.forEach(async (p, i) => {
      // El try/catch debe estar dentro del forEach para poder capturar errores por cada promesa.
      //
      // No se puede usar `resolvedPromises.length === iterable.length` para saber si todas
      // las promesas terminaron, porque `length` refleja el índice más alto asignado + 1,
      // no el número real de promesas ya resueltas.
      // Ejemplo: si la promesa en el índice 2 termina antes que las demás, `resolvedPromises.length`
      // será 3 aunque los índices 0 y 1 sigan sin resolverse.
      //
      // Esto ocurre porque las promesas se resuelven de forma asíncrona y el orden de finalización
      // no está garantizado.
      // La forma correcta es llevar un contador (`resolvedCounter`) que aumente cada vez que una promesa
      // se resuelve y comparar ese contador con `iterable.length`.
      try {
        const result = await p;
        // otro punto importante es que el resultado se debe asignar a la posicion correcta
        // ya que dado que las condiciones pueden resolverse en cualquier orden
        // asi que con esto nos asegurammos que asignamos el resultado del resultado
        // de la promesa en el correcto orden.
        resolvedPromises[i] = result;
        resolvedCounter++;
        if (resolvedCounter === iterable.length) {
          resolve(resolvedPromises as ReturnValue<T>);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

const p0 = Promise.resolve(2);
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 10);
});

console.log(await promiseAll([p0, p1]));
