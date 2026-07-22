export default function functionLength(fn) {
  return fn.length;
}

function foo() {}
function bar(a) {}
function baz(a, b) {}

console.log(functionLength(foo)); // 0
console.log(functionLength(bar)); // 1
console.log(functionLength(baz)); // 2
