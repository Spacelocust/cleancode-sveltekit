import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { MARIADB_URL } from "$env/static/private";
import { sessionTable } from "$lib/server/drizzle/table/session";
import { userTable } from "$lib/server/drizzle/table/user";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

export const connection = await mysql.createConnection(MARIADB_URL);

export const db = drizzle(connection);

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
