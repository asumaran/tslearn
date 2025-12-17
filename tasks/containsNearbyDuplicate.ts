// https://leetcode.com/problems/contains-duplicate-ii/description/
// Given an integer array nums and an integer k, return true if there are
// two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums: number[], k: number) {
  const hash: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    // El razonamiento es:
    // Si necesitas que la distancia sea menor o igual a algo,
    // el candidato más cercano siempre tiene la mejor oportunidad de cumplir.
    // Si el más cercano falla, todos los demás fallan.
    // Si el más cercano cumple, ya tienes tu respuesta.
    // Por eso los índices anteriores son irrelevantes:
    // nunca podrían darte un "sí" cuando el más reciente te dio un "no".
    if (
      nums[i] in hash && // existe en unique
      // o sea si buscamos la menor diferencia de indexes entonces
      // es inutil guardar losindex mas lejanos porque tampoco cumplirian la condicion
      Math.abs(hash[nums[i]] - i) <= k
    ) {
      return true;
    }
    hash[nums[i]] = i;
  }
  return false;
};

// Input: nums = [1,2,3,1], k = 3
// Output: true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));
