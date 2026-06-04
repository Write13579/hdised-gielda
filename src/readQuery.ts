import fs from "fs";
import path from "path";
import { Query } from "./types";

export function readQuery(): Query {
  const filePath = path.join(process.cwd(), "src/zapytanie.json");

  const data = fs.readFileSync(filePath, "utf8");

  const query: Query = JSON.parse(data);

  if (
    !query.parametry?.wybranySektor ||
    query.parametry?.cenaMniejszaNiz === undefined
  ) {
    throw new Error("Niepoprawny format zapytania");
  }

  return query;
}
