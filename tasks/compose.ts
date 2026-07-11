function compose(...fns) {
  return (val) => {
    return Array.from(fns).reduceRight((acc, currVal) => {
      return currVal(acc);
    }, val);
  };
}

const add1 = (num) => num + 1;
const double = (num) => num * 2;
const subtract10 = (num) => num - 10;

const composedFn = compose(subtract10, double, add1);
console.log(composedFn(3)); // (3 + 1) * 2 - 10 => -2
