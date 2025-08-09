type ThrottleFunction<T extends any[]> = (...args: T) => any;

// que hace throttle?
// ejecuta la funcion como maximo una vez hasta que pase un tiempo
export default function throttle<T extends any[]>(
  func: ThrottleFunction<T>,
  wait: number
): ThrottleFunction<T> {
  let shouldThrottle = false;
  // Usamos una función normal en lugar de arrow function para que `this` se resuelva
  // dinámicamente según el contexto de llamada, evitando que se enlace léxicamente
  // al contexto externo (lo que rompería casos donde `func` dependa de `this`).
  // Esto es util para cuando la funcion throttled es parte de un objeto, entonces puede usar el this.
  // const obj = {
  //   value: 42,
  //   log() {
  //     console.log(this.value);
  //   }
  // };
  // obj.log = throttle(obj.log, 1000)
  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

let i = 0;
function increment(delta) {
  i++;
  this.val += delta;
  console.log('this', this);
}

const obj = {
  val: 0,
  increment: increment,
};

obj.increment = throttle(increment, 100);

// t = 0: Call throttledIncrement(). i is now 1.
obj.increment(2); // i = 1
console.log('i', i);
