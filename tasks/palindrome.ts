export default function palindrome(n) {
  // // first easy attempt
  // const s = String(n);
  // return s === s.split('').reverse().join('');

  // // recorriendo todo el numero y comparando al final
  // if (n < 0) {
  //   return false;
  // }
  //
  // const original = n;
  // let reverse = 0;
  //
  // // se hace el bucle mientras n > 0 porque mientras se divida entre 10 dará un numero positivo, cuando n llegue a las decenas, la division retornara cero
  // // queriendo decir que llegó al final del recorrido por lo tanto termina el bucle.
  //
  // while (n > 0) {
  //   const currDigit = n % 10;
  //   reverse = reverse * 10 + currDigit;
  //   n = Math.floor(n / 10);
  // }
  //
  // return reverse === original;

  // recorriendo el numero hasta la mitad.
  if (n < 0 || (n % 10 === 0 && n != 0)) {
    return false;
  }

  let reverse = 0;

  while (n > reverse) {
    const digit = n % 10; // el ultimo digito
    reverse = reverse * 10 + digit;
    n = Math.floor(n / 10);
  }
  return n === reverse || n === Math.floor(reverse / 10);
}

console.log(palindrome(121));
console.log(palindrome(0));
console.log(palindrome(10));

// 123
//
// 123       3
//           32
// 123       321
//
//
//
// 121       1
//           12
//           121
