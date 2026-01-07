export default function maximumWaterBetweenWalls(walls: number[]): number {
  // una solucion seria ir desde el inicio y el final, y comparar alturas
  // nos quedariamos con la altura menor y de ahi calculariamos el resultado que seria
  // la resta de la posicion del item de la derecha menos la posicion de la izquierda
  // el tema es que creo no podria resolverlo con iterar de cada lado ya que no estsariamos iterando
  // todas las combinaciones posibles entre las paredes
  let left = 0;
  let right = walls.length - 1;
  let result = 0;

  while (left < right) {
    console.log(walls[left], walls[right]);

    result = Math.max(
      result,
      (right - left) * Math.min(walls[left], walls[right])
    );

    if (walls[left] < walls[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}

// Input: walls = [1,4,2,3]
// Output: 6
// Explanation: Consider two walls (i=1 & i=3) with heights 4 and 3.
// The water is limited by the shorter wall with height 3,
// so the container holds 2 (distance) * 3 (shorter height) = 6 units. All other combination of walls result in smaller area.

console.log(maximumWaterBetweenWalls([1, 4, 2, 3]));
