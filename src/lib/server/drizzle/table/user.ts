import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  username: varchar("username", {
    length: 255,
  }).unique(),
  password: varchar("password", {
    length: 255,
  }),
});
