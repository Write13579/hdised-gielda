import { readQuery1, readQuery2, readQuery3 } from "@/readQuery";
import { spolkiTables } from "@/db/schema";
import { db } from "..";
import {
  operacjaNajdrozszaSpolkaDzisiajKraj,
  operacjaNajnizszyProcentSpolekNaLitereX,
  operacjaSektorCena,
} from "./functions";

export default async function Home() {
  const query1 = readQuery1();
  const query2 = readQuery2();
  const query3 = readQuery3();

  const allSpolki = await db.select().from(spolkiTables);

  //   {
  //   "operacja": "SEKTOR_CENA",
  //   "parametry": {
  //     "wybranySektor": "Technologia",
  //     "cenaMniejszaNiz": 250
  //   }
  //   }
  const fullAnswer1 = await operacjaSektorCena(query1.query);

  const fullAnswer2 = await operacjaNajdrozszaSpolkaDzisiajKraj(query2.query);

  const fullAnswer3 = await operacjaNajnizszyProcentSpolekNaLitereX(
    query3.query,
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="border p-5 flex justify-center flex-col">
          <h1 className="mb-2">odpowiedz do twojego zapytania1:</h1>
          zapytanie: {query1.nazwaOperacji}:
          <div>
            {fullAnswer1.map((spolka) => (
              <div key={spolka.symbol}>
                <h2>-{spolka.nazwa}</h2>
                <p className="mb-3">Symbol: {spolka.symbol}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border p-5 flex justify-center flex-col">
          <h1 className="mb-2">odpowiedz do twojego zapytania2:</h1>
          zapytanie: {query2.nazwaOperacji}:
          <div>
            {fullAnswer2.fullAnswer.map((spolka) => (
              <div key={spolka.symbol}>
                <h2>-{spolka.nazwa}</h2>
                <p className="mb-3">Symbol: {spolka.symbol}</p>
              </div>
            ))}
          </div>
          Cena: {fullAnswer2.maxPrice}
          {fullAnswer2.currency}
        </div>
        <div className="border p-5 flex justify-center flex-col">
          <h1 className="mb-2">odpowiedz do twojego zapytania3:</h1>
          zapytanie: {query3.nazwaOperacji}:
          <div>
            {fullAnswer3.fullAnswer.map((spolka) => (
              <div key={spolka.symbol}>
                <h2>-{spolka.nazwa}</h2>
                <p className="mb-3">Symbol: {spolka.symbol}</p>
              </div>
            ))}
          </div>
          Procent: {fullAnswer3.minProcent}%
        </div>
        <h2>Wszystkie spółki w bazie danych:</h2>
        <div
          id="allesSpolki"
          className="w-full h-96 grid grid-cols-3 overflow-y-scroll m-1 p-1">
          {allSpolki.map((spolka) => (
            <div key={spolka.symbol}>
              <h2>
                ({spolka.symbol}) {spolka.nazwa}
              </h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
