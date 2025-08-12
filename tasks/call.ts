interface Function {
  myCall(this: Function, thisArg: any, ...argArray: any[]): any;
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  // return this.bind(thisArg)(...argArray);
  // return this.bind(thisArg, ...argArray)();

  const fn = this;
  const key = Symbol();
  const _this = thisArg || global;
  _this[key] = fn;
  const result = _this[key](...argArray);
  delete _this[key];
  return result;
};

function multiplyAge(multiplier = 1) {
  return this.age * multiplier;
}

const mary = {
  age: 21,
};

const john = {
  age: 42,
};

console.log(multiplyAge.myCall(mary)); // 21
console.log(multiplyAge.myCall(john, 2)); // 84
