interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.
export default class EventEmitter implements IEventEmitter {
  private listeners: Record<string, Function[]> = {};

  constructor() {
    // throw 'Not implemented!';
  }

  on(eventName: string, listener: Function): IEventEmitter {
    let eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.push(listener);
    } else {
      this.listeners[eventName] = [listener];
    }

    return this;
  }

  off(eventName: string, listener: Function): IEventEmitter {
    const listeners = this.listeners[eventName];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index === -1) {
      } else {
        // **************************************************
        // NO USAR DELETE PORQUE DEJA UNDEFINED EN LA POSICION
        // **************************************************
        // delete this.listeners[eventName][index];
        this.listeners[eventName].splice(index, 1);
      }
    }
    return this;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    if (
      Object.hasOwn(this.listeners, eventName) &&
      this.listeners[eventName].length > 0
    ) {
      // por seguridad deberiamos clonar los listeners registrados
      // porque podria pasar que un listener emita un off que elimine
      // un listener de la lista, resultando en resultados inesperados.
      const listeners = this.listeners[eventName].slice();
      listeners.forEach((listener) => {
        listener.call(null, ...args);
      });
      return true;
    } else {
      return false;
    }
  }
}

const emitter = new EventEmitter();

let sum = 0;
function addTwoNumbers(a: number, b: number) {
  sum = a + b;
}
emitter.on('foo', addTwoNumbers);
console.log(emitter.emit('foo', 2, 5));
console.log(sum); // deberia ser 7

emitter.off('foo', addTwoNumbers); // elimina?
console.log(emitter.emit('foo', -3, 9)); // deberia ser false
console.log(sum); // deberia permanecer 7

// function addTwoNumbers(a, b) {
//   console.log(`The sum is ${a + b}`);
// }
// emitter.on('foo', addTwoNumbers);
// console.log(emitter.emit('foo', 2, 5));
// // > "The sum is 7"

// emitter.on('foo', (a, b) => console.log(`The product is ${a * b}`));
// console.log(emitter.emit('foo', 4, 5));
// // > "The sum is 9"
// // > "The product is 20"

// emitter.off('foo', addTwoNumbers);
// console.log(emitter.emit('foo', -3, 9));
// // > "The product is -27"
