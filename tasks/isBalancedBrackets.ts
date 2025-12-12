export default function isBalancedBrackets(str: string): boolean {
  const mappings: Record<string, string> = {
    ']': '[',
    '}': '{',
    ')': '(',
  };
  const stack = [];
  for (let c of str) {
    if (mappings[c]) {
      if (stack.pop() !== mappings[c]) {
        return false;
      }
    } else {
      stack.push(c);
    }
  }
  console.log('stack', stack);
  return stack.length === 0;
}

const test = ']';

console.log(isBalancedBrackets(test));
