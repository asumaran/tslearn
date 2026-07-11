export default function setCancellableInterval(callback, delay, ...args) {
  console.log('yyy');
  const intervalId = setInterval(callback, delay, ...args);

  const cancel = function () {
    clearInterval(intervalId);
  };

  return cancel;
}

let i = 0;
// t = 0:
const cancel = setCancellableInterval(() => {
  console.log(i++);
}, 1000);
// t = 10: i is 1
// t = 20: i is 2
cancel(); // Called at t = 25
// t = 30: i is still 2 because cancel() was called and the interval callback has stopped running.
