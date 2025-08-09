export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  let accumulated = [];

  // if (typeof args === 'string') {
  //   return args;
  // }

  if (Array.isArray(args)) {
    for (let i = 0; i < args.length; i++) {
      // ignore falsey values
      if (!args[i]) {
        continue;
      } else if (typeof args[i] === 'string' || typeof args[i] === 'number') {
        accumulated.push(args[i]);
        continue;
      } else if (Array.isArray(args[i])) {
        accumulated.push(classNames(...(args[i] as ClassArray)));
        continue;
      } else if (typeof args[i] === 'object' && args[i] !== null) {
        const values: string[] = [];
        // dentro del for...in, TypeScript no está convencido de que la variable
        // ya sea de ese tipo en ese contexto, porque el as no cambia el tipo de
        // la variable args[i], solo lo fuerza para esa expresión puntual.
        // Lo correcto es narrowing antes de iterar, así:
        const dict = args[i] as ClassDictionary;
        for (const key in dict) {
          if (dict[key]) {
            values.push(key);
          }
        }
        // si no verificamos que el array no esta vacio terminariamos haciendo push
        // de un string vacio a acumulated porque classNames iba a retornar [].join(' ')
        // el cual retorna un espacio vacio "".
        if (values.length > 0) {
          // accumulated.push(classNames(...values));
          // no es necesario hacer una recursion mas ya que en este caso se sabe que es un array de strings.
          accumulated.push(values.join(' '));
        }
        continue;
      }
    }
  }
  console.log({ accumulated });
  return accumulated.join(' ');
}
// console.log(JSON.stringify(classNames('a', 1))); // 'a b c'
// console.log(JSON.stringify(classNames({ baz: null })));
console.log(
  JSON.stringify(
    classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')
  )
); // 'a b c'
// console.log(JSON.stringify(classNames('a', ['b', { c: true, d: false }]))); // 'a b c'
