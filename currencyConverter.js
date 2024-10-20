// This is a simplified version. In a real app, you'd want to use up-to-date exchange rates.
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  // Add more currencies here...
};

export function convertCurrency(amount, fromCurrency, toCurrency) {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  return (amount / fromRate) * toRate;
}
