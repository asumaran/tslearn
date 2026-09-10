/**
 * @param {number} duration
 * @return {Promise<void>}
 */
export default async function sleep(duration) {
  let id;
  const promise = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      console.log('se resuelve aqui');
      resolve(id);
    }, duration);
  });

  return promise;
}

async function greeting() {
  console.log('Hello!');
  await sleep(2000);
  console.log('Bye.'); // Only logs after 2000 milliseconds (2 seconds)
}

greeting();
// t = 0: Hello!
// t = 2000: Bye.

// console.log('Hello!');
// sleep(2000).then(() => {
//   console.log('Bye.'); // Only logs after 2000 milliseconds (2 seconds)
// });
