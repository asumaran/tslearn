type Fn = (this: any, arg: string | number) => unknown;

export default function memoize(func: Fn): Fn {
  const cache = new Map();
  return function (this: any, arg: any) {
    if (!cache.has(arg)) {
      const res = func.call(this, arg);
      cache.set(arg, res);
    }
    return cache.get(arg);
  };
}

function expensiveFunction(n) {
  console.log('Computing...');
  return n * 2;
}

// Create a memoized version of the function.
const memoizedExpensiveFunction = memoize(expensiveFunction);

// First call (computes and caches the result).
console.log(memoizedExpensiveFunction(5)); // Output: Computing... 10

// Second call with the same argument (returns the cached result).
console.log(memoizedExpensiveFunction(5)); // Output: 10

// Third call with a different argument (computes and caches the new result).
console.log(memoizedExpensiveFunction(10)); // Output: Computing... 20

// Fourth call with the same argument as the third call (returns the cached result).
console.log(memoizedExpensiveFunction(10)); // Output: 20
