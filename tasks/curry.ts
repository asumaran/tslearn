// Función curry: transforma una función en su versión currificada
// Permite aplicar argumentos de forma parcial, uno a la vez
export default function curry(func: Function): Function {
  // Retorna una función interna que acumula argumentos
  return function curried(this: any, ...args: any) {
    // Verifica si aún faltan argumentos por recibir
    // func.length = número de parámetros que espera la función original
    // args.length = número de argumentos que ya hemos acumulado
    if (args.length < func.length) {
      // Retorna una nueva función que espera el siguiente argumento
      return (arg: any) =>
        // Si el argumento es undefined, ejecuta con los argumentos actuales
        arg === undefined
          ? curried.call(this, ...args)
          : // Si no, acumula el nuevo argumento y continúa el proceso
            curried.call(this, ...args, arg);
    }

    // Cuando ya tenemos todos los argumentos necesarios, ejecuta la función original
    // Usa spread operator (...args) para pasar los argumentos individuales
    return func.call(this, ...args);
  };
}

function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
console.log(curriedAdd(3)(4)); // 7

const alreadyAddedThree = curriedAdd(3);
console.log(alreadyAddedThree(4)); // 7
