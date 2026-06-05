//import "server-only";

import { Query } from "@/types";
import yahooFinance from "yahoo-finance2";
import { db } from "..";
import { Spolka, spolkiTables } from "@/db/schema";
import { eq, like } from "drizzle-orm";

const yahooFinanceClient = new yahooFinance();

export async function getStockPriceBySymbols(symbols: string[]): Promise<[string, Record<string, number>]> {
  try {
    const prices: Record<string, number> = {};
    let currency = "";
    for (const symbol of symbols) {
      const quote = await yahooFinanceClient.quote(symbol);
      currency = quote.currency ?? "ERR";
      prices[symbol] = quote.regularMarketPrice ?? 0;
    }

    return [currency, prices];
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    return ["ERR", {}];
  }
}

export async function getProcentsBySymbols(symbols: string[]): Promise<Record<string, number>> {
  try {
    const procents: Record<string, number> = {};
    for (const symbol of symbols) {
      const quote = await yahooFinanceClient.quote(symbol);
      procents[symbol] = quote.regularMarketChangePercent ?? 0;
    }
    return procents;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return {};
  }
}

export async function operacjaSektorCena(query: Query) {
  const queryAnswer = await db
    .select()
    .from(spolkiTables)
    .where(eq(spolkiTables.sektor, query.parametry.wybranySektor));

  const symbols = queryAnswer.map((spolka) => spolka.symbol);

  const [currency, prices] = (await getStockPriceBySymbols(symbols)) ?? [
    "ERR",
    {},
  ];

  const fullAnswer = queryAnswer.filter((spolka) => {
    const price = prices[spolka.symbol] ?? 0;
    return price < query.parametry.cenaMniejszaNiz;
  });

  return fullAnswer;
}

export async function operacjaNajdrozszaSpolkaDzisiajKraj(query: Query) {
  const queryAnswer = await db
    .select()
    .from(spolkiTables)
    .where(eq(spolkiTables.kraj, query.parametry.kraj));

  const symbols = queryAnswer.map((spolka) => spolka.symbol);

  const [currency, prices] = (await getStockPriceBySymbols(symbols)) ?? ["ERR", {}];

  const maxPrice = Math.max(...Object.values(prices));

  const fullAnswer = queryAnswer.reduce((acc, spolka) => {
    const price = prices[spolka.symbol] ?? 0;
    if (price === maxPrice) {
      acc.push(spolka);
    }
    return acc;
  }, [] as Spolka[]);

  return { fullAnswer, maxPrice, currency };
}

export async function operacjaNajnizszyProcentSpolekNaLitereX(query: Query) {
  const queryAnswer = await db
    .select()
    .from(spolkiTables)
    .where(like(spolkiTables.nazwa, `${query.parametry.naLitere}%`));
  const symbols = queryAnswer.map((spolka) => spolka.symbol);

  const procents = (await getProcentsBySymbols(symbols)) ?? {};

  const minProcent = Math.min(...Object.values(procents));

  const fullAnswer = queryAnswer.reduce((acc, spolka) => {
    const procent = procents[spolka.symbol] ?? 0;
    if (procent === minProcent) {
      acc.push(spolka);
    }
    return acc;
  }, [] as Spolka[]);
  return { fullAnswer, minProcent };
}
