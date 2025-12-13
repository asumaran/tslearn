export default function optimalStockTrading(prices: number[]): number {
  let lowestPrice = prices[0];
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    lowestPrice = Math.min(prices[i], lowestPrice);
    // el tema era comparar contra el precio actual
    maxProfit = Math.max(maxProfit, prices[i] - lowestPrice);
  }

  return maxProfit;
}

// const test = [4, 3, 2, 1];
// const test = [6, 8, 1, 2, 30, 19]; // 29
const test = [3, 5, 4, 10, 4, 0]; // 7
console.log(optimalStockTrading(test));
