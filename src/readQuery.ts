import fs from "fs";
import path from "path";
import { Query } from "./types";

export function readQuery1(): { nazwaOperacji: string; query: Query } {
  const filePath = path.join(process.cwd(), "src/zapytanie1.json");

  const data = fs.readFileSync(filePath, "utf8");

  const query: Query = JSON.parse(data);

  // if (
  //   !query.parametry?.wybranySektor ||
  //   query.parametry?.cenaMniejszaNiz === undefined
  // ) {
  //   throw new Error("Niepoprawny format zapytania");
  // }

  return { nazwaOperacji: query.operacja, query };
}

export function readQuery2(): { nazwaOperacji: string; query: Query } {
  const filePath = path.join(process.cwd(), "src/zapytanie2.json");

  const data = fs.readFileSync(filePath, "utf8");

  const query: Query = JSON.parse(data);

  // if (
  //   !query.parametry?.wybranySektor ||
  //   query.parametry?.cenaMniejszaNiz === undefined
  // ) {
  //   throw new Error("Niepoprawny format zapytania");
  // }

  return { nazwaOperacji: query.operacja, query };
}

export function readQuery3(): { nazwaOperacji: string; query: Query } {
  const filePath = path.join(process.cwd(), "src/zapytanie3.json");

  const data = fs.readFileSync(filePath, "utf8");

  const query: Query = JSON.parse(data);

  // if (
  //   !query.parametry?.wybranySektor ||
  //   query.parametry?.cenaMniejszaNiz === undefined
  // ) {
  //   throw new Error("Niepoprawny format zapytania");
  // }

  return { nazwaOperacji: query.operacja, query };
}
