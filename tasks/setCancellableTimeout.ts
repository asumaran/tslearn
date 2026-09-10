import { clearTimeout } from 'node:timers';

/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableTimeout(callback, delay, ...args) {
  let setTimeoutId;
  function cancel() {
    console.log('cancela aqui');
    clearTimeout(setTimeoutId);
  }

  setTimeoutId = setTimeout(function () {
    console.log(this);
    callback.call(this, ...args);
  }, delay);

  return cancel;
}

let i = 0;
// t = 0:
const cancel = setCancellableTimeout(() => {
  i++;
}, 2000);
// t = 50:
cancel();
// t = 100: i is still 0 because cancel() was called.
