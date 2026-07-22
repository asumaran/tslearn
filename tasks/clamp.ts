/**
 * @param {number} value The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
export default function clamp(value, lower, upper) {
  if (value < lower) {
    return lower;
  }

  if (value > upper) {
    return upper;
  }

  return value;
}

// Within the bounds, return as-is.
console.log(clamp(3, 0, 5)); // => 3

// Smaller than the lower bound.
console.log(clamp(-10, -3, 5)); // => -3

// Bigger than the upper bound.
console.log(clamp(10, -5, 5)); // => 5
