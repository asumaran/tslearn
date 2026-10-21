export default function removeDuplicates(nums) {
  // lo caracteristico de este tipo de array es que son ordenados y
  // que los items duplicados estan juntos ya que estan ordenados.
  // ademas no importa que se deja despues de ordenar el ultimo item.

  let insertIndex = 1;

  for (let i = 1; i < nums.length; i++) {
    // console.log(i, nums[i]);
    if (nums[i - 1] !== nums[i]) {
      console.log('mover', i);
      nums[insertIndex] = nums[i];
      insertIndex++;
    }
  }
  return insertIndex;
}

console.log(removeDuplicates([1, 2, 3, 3, 4]));
