import { readQuery } from "@/readQuery";
import { spolkiTables } from "@/db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { getStockPriceBySymbols } from "./functions";

export default async function Home() {
  const query = readQuery();
  console.log(query);

  const allSpolki = await db.select().from(spolkiTables);

  const queryAnswer = await db
    .select()
    .from(spolkiTables)
    .where(eq(spolkiTables.sektor, query.parametry.wybranySektor));

  const symbols = queryAnswer.map((spolka) => spolka.sybol);

  const prices = (await getStockPriceBySymbols(symbols)) ?? {};

  const fullAnswer = queryAnswer.filter((spolka) => {
    const price = prices[spolka.sybol] ?? 0;
    return price < query.parametry.cenaMniejszaNiz;
  });

  console.log(fullAnswer);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1>odpowiedz do twojego zapytania:</h1>
          <div>
            {fullAnswer.map((spolka) => (
              <div key={spolka.sybol}>
                <h2>-{spolka.nazwa}</h2>
                <p className="mb-3">Symbol: {spolka.sybol}</p>
              </div>
            ))}
          </div>
        </div>
        <h2>Wszystkie spółki w bazie danych:</h2>
        <div
          id="allesSpolki"
          className="w-full h-96 grid grid-cols-3 overflow-y-scroll m-1 p-1">
          {allSpolki.map((spolka) => (
            <div key={spolka.sybol}>
              <h2>
                ({spolka.sybol}) {spolka.nazwa}
              </h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
