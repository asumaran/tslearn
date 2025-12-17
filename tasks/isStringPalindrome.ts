export default function isStringPalindrome(str: string): boolean {
  const lowercase = str.toLowerCase();
  let i = 0;
  let j = lowercase.length - 1;
  const aCode = 'a'.charCodeAt(0);
  const zCode = 'z'.charCodeAt(0);

  while (i < j) {
    const leftCharCode = lowercase[i].charCodeAt(0);
    if (!(leftCharCode >= aCode && leftCharCode <= zCode)) {
      i++;
      continue;
    }

    const rightCharCode = lowercase[j].charCodeAt(0);
    if (!(rightCharCode >= aCode && rightCharCode <= zCode)) {
      j--;
      continue;
    }

    if (leftCharCode !== rightCharCode) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}

// Input: str = "No 'x' in Nixon"
// Output: true

console.log(isStringPalindrome('L>xPS6pp6SPx>L'));
