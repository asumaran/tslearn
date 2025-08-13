export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  // sacamos entradas vacias
  let processedItems = items.filter(Boolean);

  // unique?
  if (options?.unique) {
    processedItems = [...new Set(processedItems)];
  }

  // sorted?
  if (options?.sorted) {
    processedItems.sort((a, b) => a.localeCompare(b));
  }

  // show others?
  // si el length pasado es mayor que cero
  // y ademas es menor que el length del array pasado
  // entonces quiere decir que tendremos al menos un item para ser puesto como "and 1 other(s)".
  // si es igual (o mayor) entonces el "and {last array item}" sera usado.
  let othersCount = 0;
  if (
    options?.length &&
    options?.length > 0 &&
    options?.length < processedItems.length
  ) {
    othersCount = processedItems.length - options?.length; // sera mayor que cero
    processedItems = processedItems.slice(0, options?.length);

    // dado que habrá "others" agregamos como ultimo item el "{othersCount} other(s)""
    processedItems.push(`${othersCount} other${othersCount > 1 ? 's' : ''}`);
  }

  if (processedItems.length === 0) {
    return '';
  }
  if (processedItems.length === 1) {
    return processedItems[0];
  }

  // esto funcionara para el caso en que haya "other" y cuando no.
  return `${processedItems.slice(0, -1).join(', ')} and ${processedItems.at(-1)}`;
}

console.log(listFormat([])); // ''

console.log(listFormat(['Bob'])); // 'Bob'
console.log(listFormat(['Bob', 'Alice'])); // 'Bob and Alice'

console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John']));
// 'Bob, Ben, Tim, Jane and John'

console.log(
  listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
    length: 3,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(
  listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
    length: 4,
  })
); // 'Bob, Ben, Tim, Jane and 1 other'

console.log(
  listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
    length: 3,
    sorted: true,
  })
); // 'Ben, Bob, Jane and 2 others'

console.log(
  listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], {
    length: 3,
    unique: true,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(
  listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
    length: 3,
    unique: true,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(listFormat(['Bob', 'Ben', '', '', 'John'])); // 'Bob, Ben and John'

console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: -1 }));
// 'Bob, Ben, Tim, Jane and John
