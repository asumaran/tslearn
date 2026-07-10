export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    iterable.forEach((p) => {
      Promise.resolve(p).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

// const p0 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(42);
//   }, 100);
// });
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('Err!');
//   }, 200);
// });
//
// console.log(await promiseRace([p0, p1])); // 42
//
// const p0 = Promise.resolve(42);
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(21);
//   }, 100);
// });
//
// console.log(await promiseRace([p0, p1])); // 42

console.log(await promiseRace([2]));
