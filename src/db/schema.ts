import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const spolkiTables = sqliteTable("spolki", {
  id: int().primaryKey({ autoIncrement: true }),
  sybol: text().notNull(),
  nazwa: text().notNull(),
  sektor: text().notNull(),
  kraj: text().notNull(),
});

export type Spolka = typeof spolkiTables.$inferSelect;
