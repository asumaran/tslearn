// https://www.greatfrontend.com/questions/javascript/promisify-ii

// /**
//  * @param {Function} func
//  * @returns {Function}
//  */
// export default function promisify(func) {
//   console.log(this);
//   return (...args) => {
//     return new Promise((resolve, reject) => {
//       func.call(this, ...args, (error, res) => {
//         if (error) {
//           reject(error);
//         }
//         resolve(res);
//       });
//     });
//   };
// }
//
// // // The callback has the signature `(err, value) => any`
// // function delayedResolve(cb: Function) {
// //   setTimeout(() => {
// //     cb(null, 42);
// //   }, 10);
// // }
// // // retorna una nueva funcion la cual toma como parametro la funcion a la que se va a convertir a promesa
// // const promisifiedFoo = promisify(delayedResolve);
// // //
// // const data = await promisifiedFoo();
// //
// // console.log('data', data); // deberia soltar 42
//
// // Example function with callback as last argument
// // The callback has the signature `(err, value) => any`
//
// // function delayedResolve(cb: Function) {
// //   setTimeout(() => {
// //     cb(null, 42);
// //   }, 10);
// // }
// function divide(a, b, callback) {
//   setTimeout(() => {
//     if (b === 0) {
//       callback(new Error('Cannot divide by zero'));
//       return;
//     }
//
//     callback(null, a / b);
//   }, 500);
// }
//
// const divideAsync = promisify(divide);
//
// divideAsync(10, 2)
//   .then(console.log) // 5
//   .catch(console.error);
//
// divideAsync(10, 0)
//   .then(console.log)
//   .catch((err) => console.log(err.message)); // Cannot divide by zero
//
// // function asyncIdentity<T>(x: T, cb: Function) {
// //   setTimeout(() => {
// //     cb(null, x);
// //   }, 10);
// // }
// //
// // const promisified = promisify(asyncIdentity);
// // const res = await promisified(23);

export default function promisify(func) {
  if (func[Symbol.for('util.promisify.custom')]) {
    return func[Symbol.for('util.promisify.custom')];
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, val) => {
        if (err) {
          reject(err);
        }
        resolve(val);
      });
    });
  };
}
