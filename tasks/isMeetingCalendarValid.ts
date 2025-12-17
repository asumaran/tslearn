export default function isMeetingCalendarValid(intervals: number[][]): boolean {
  // creo que la idea seria, verificar cada "start" no esté dentro de un existente "start+duracion"
  // por ejemplo
  // start = 1, end = 5, no hay previo entonces pasa al sigueinte
  // start = 5, end = 10, duracion del previo es 5-1=4, entonces 5>1 && 5<=5 true, entonces no incia dentro de un meeting existente.
  // start = 10 end = 15, duracion precio es 10-5=5, entonces 10>

  // quizas sea mejor ordenar por inicio primero cosa que no tendriamos que hacer multiples for.
  // por ahora hagamos con dos for.
  const hash: Record<number, number> = {}; // [start] = end
  for (const [start, end] of intervals) {
    console.log({ start, end, hash });
    for (const prevStart in hash) {
      // uno empieza antes que termine el otro
      // o sea, es falso si es que
      //  el la hora de empiece actual empieza antes que finalize el item actual y
      //  la hora de termino actual es después que empieza el item actual
      // estas dos condiciones son ciertas para cualquier caso siempre que hay overlap
      if (start < hash[prevStart] && Number(prevStart) < end) {
        return false;
      }
    }
    hash[start] = end;
  }
  return true;
}

// Input: intervals = [[1,5],[5,10],[10,15]]
// Output: true
// Explanation: There is only one meeting, so there is no possibility of overlap.

console.log(
  isMeetingCalendarValid([
    [8, 10],
    [1, 3],
    [2, 6],
    [15, 18],
  ])
); // false
