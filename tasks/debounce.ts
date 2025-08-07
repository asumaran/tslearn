// Debounce consiste en controlar cuantas veces permitimos
// ejecutar a una funcion sobre un determinado tiempo.
// Entonces una funcion que ha sido sometido a "debouncing" debe esperar el timepo
// pasado (wait) para volver a ser ejecutado.
const debouncev1 = (fn: Function, wait: number) => {
  let setTimeoutId: ReturnType<typeof setTimeout>;

  function debounced() {
    if (setTimeoutId) {
      return;
    }
    setTimeoutId = setTimeout(() => {
      fn();
    }, wait);
  }

  return debounced;
};

const sayHello = () => {
  console.log('hola mundo!');
};

const debouncedSayHello = debouncev1(sayHello, 500);

// debouncedSayHello();
// debouncedSayHello();

// agregamos opcion de pasar parametros a la funcion debounced
// las mismas que aceptaria la funcion original.
const debouncev2 = (fn: Function, wait: number) => {
  let setTimeoutId: ReturnType<typeof setTimeout>;

  function debounced(...args: any[]) {
    if (setTimeoutId !== null) {
      // esto es importante oara asegurarse de que solo el ultimo sea llamado
      // si debounced es llamada consecutivas veces siemore eliminará el anterior settimeout.
      // entonces el siguiente bloque de codigo se ejecutará programando una nueva
      // ejecucion de fn para cuando pase wait tiempo.
      clearTimeout(setTimeoutId);
    }

    setTimeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }

  return debounced;
};

const sayHello2 = (name = 'Alfredo') => {
  console.log(`Hola ${name}!`);
};

const debouncedSayHello2 = debouncev2(sayHello2, 500);

// debouncedSayHello2('Raquel1'); // primer call
// debouncedSayHello2('Raquel2'); // ✅ segundo call, ❌ primer call es descartado via clearTimeout
// setTimeout(() => {
//   debouncedSayHello2('Raquel3'); // ✅ tercer cakk despues de 600ms,
// }, 600);

// --------
// ahora vamos a agregar la capcidad de cancelar y hacer fluch
interface DebouncedFunction extends Function {
  cancel: () => void;
  flush: () => void;
}

const debouncev3 = (func: Function, wait: number): DebouncedFunction => {
  let lastArgs: any[] | null,
    lastThis: any,
    setTimeoutId: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: any[]) {
    lastArgs = args;
    lastThis = this;

    if (setTimeoutId !== null) {
      clearTimeout(setTimeoutId);
    }

    setTimeoutId = setTimeout(() => {
      func.apply(lastThis, lastArgs);
      setTimeoutId = null; // ✅ Esto evita doble ejecución con flush()
      lastArgs = null;
      lastThis = null;
    }, wait);
  }

  function cancel() {
    if (setTimeoutId !== null) {
      clearTimeout(setTimeoutId);
    }
    lastThis = null;
    lastArgs = null;
  }

  function flush() {
    // Hacer que flush() solo ejecute la función si hay una ejecución pendiente válida,
    // es decir, setTimeoutId !== null y lastArgs !== null y lastThis !== null.
    if (setTimeoutId !== null && lastArgs !== null && lastThis !== null) {
      clearTimeout(setTimeoutId);

      func.apply(lastThis, lastArgs);
      setTimeoutId = null;
      lastArgs = null;
      lastThis = null;
    }
  }

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
};

const sayHello3 = (name = 'Alfredo') => {
  this.foo = 'foo';
  console.log(`Hola ${this.foo}!`);
};

const debouncedSayHello3 = debouncev3(sayHello3, 500);

debouncedSayHello3('Raquel1');
debouncedSayHello3('Raquel2');
setTimeout(() => {
  debouncedSayHello3('Raquel3');
}, 501);
// falta poner ejemplo de cancel y flush, pero se hizo en greatfrontend
