export default function optimalStockTrading(prices: number[]): number {
  let lowestPrice = prices[0];
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    lowestPrice = Math.min(prices[i], lowestPrice);
    // el tema era comparar contra el precio actual
    maxProfit = Math.max(maxProfit, prices[i] - lowestPrice);
  }
  return maxProfit;

  // Approach 2, fuerza bruta
  // let maxProfit = 0;
  // for (let i = 0; i < prices.length; i++) {
  //   for (let j = i + 1; j < prices.length; j++) {
  //     console.log(prices[i], prices[j]);
  //     const profit = prices[j] - prices[i];
  //     if (profit > maxProfit) {
  //       maxProfit = profit;
  //     }
  //   }
  // }
  // return maxProfit;
}

// const test = [4, 3, 2, 1];
// const test = [6, 8, 1, 2, 30, 19]; // 29
const test = [1, 2, 3, 4]; // 7
console.log(optimalStockTrading(test));
