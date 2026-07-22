export default function promiseMerge(p1, p2) {
  const total = 2;

  return new Promise(() => {
    function then(result) {
      total--;
      if (total === 0) {
        resolve(result);
      }
    }

    p1.then((result) => {
      then(result);
    });

    p2.then((result) => {
      then(result);
    });
  });
}

console.log(await promiseMerge(Promise.resolve(1), Promise.resolve(2)));
