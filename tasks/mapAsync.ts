export default function mapAsync<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    let count = 0;
    const resolves: any = [];

    if (iterable.length === 0) {
      return resolve([]);
    }

    iterable.forEach(async (p, index) => {
      try {
        resolves[index] = await callbackFn.call(null, p);
        count++;
        if (count === iterable.length) {
          resolve(resolves);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

const asyncDouble = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

const doubled = await mapAsync([1, 2], asyncDouble);
console.log(doubled); // [2, 4]
