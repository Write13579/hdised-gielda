//import "server-only";

import yahooFinance from "yahoo-finance2";

const yahooFinanceClient = new yahooFinance();

export async function getStockPriceBySymbols(symbols: string[]) {
  try {
    const prices: Record<string, number> = {};
    for (const symbol of symbols) {
      const quote = (await yahooFinanceClient.quote(symbol)) as {
        regularMarketPrice?: number;
      };

      prices[symbol] = quote.regularMarketPrice ?? 0;
    }

    return prices;
  } catch (error) {
    console.error("Error fetching stock prices:", error);
  }
}
