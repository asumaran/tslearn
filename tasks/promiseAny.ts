export default function promiseAny<T>(iterable: Array<T>): Promise<T> {
  const res = new Promise<T>((resolve, reject) => {
    if (iterable.length === 0) {
      reject(new AggregateError([]));
    }

    let pending = iterable.length;
    const errors = new Array(iterable.length);

    iterable.forEach(async (p, i) => {
      try {
        const result = await p;
        resolve(result);
      } catch (e) {
        errors[i] = e;
        pending--;

        if (pending === 0) {
          reject(new AggregateError(errors));
        }
      }
    });
  });

  return res;
}

const p0 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(42);
  }, 400);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

(async () => {
  console.log('xx1');

  try {
    await promiseAny([p0, p1]);
    console.log('xx');
  } catch (err) {
    console.log(err instanceof AggregateError); // true
    console.log((err as AggregateError).errors); // [ 42, "Err!" ]
  }
})();
