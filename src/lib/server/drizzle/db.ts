import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const { MARIADB_URL } = process.env;

import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sessionTable } from './table/session';
import { userTable } from './table/user';

export const connection = await mysql.createConnection(MARIADB_URL);

export const db = drizzle(connection);

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
