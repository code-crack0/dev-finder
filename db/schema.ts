import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: text('id').notNull().primaryKey(),
  name:text('name'),
});