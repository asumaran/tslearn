export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean';
}

// console.log(isBoolean(true));
// console.log(isBoolean(false));
// console.log(isBoolean('x'));
// console.log(isBoolean([]));
// console.log(isBoolean({}));

// to ask: are we considering NaN a number?
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

// console.log(isNumber(1));
// console.log(isNumber(-1));
// console.log(isNumber(1.2));
// console.log(isNumber(-2.2));
// console.log(isNumber(Number(1)));
// console.log(isNumber(Infinity));
// console.log(isNumber(NaN)); // x q retorna true?
// console.log(isNumber([]));
// console.log(isNumber({}));

export function isNull(value: unknown): boolean {
  return value === null;
}

// console.log(isNull(null));
// console.log(isNull(''));
// console.log(isNull(NaN));

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}

export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
