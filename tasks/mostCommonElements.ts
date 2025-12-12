export default function mostCommonElements(
  numbers: number[],
  k: number
): number[] {
  // Map de frecuencia con tipos explícitos
  const m = new Map<number, number>();

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    m.set(n, (m.get(n) || 0) + 1);
  }

  // Convertir entradas a array [value, count], ordenar por count descendente
  const sorted = Array.from(m.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => value);

  return sorted.slice(0, k);
}

// 5,5,2,4,1,5] k = 1

console.log(mostCommonElements([4, 4, 4, 6, 6, 5, 5, 5], 2));
