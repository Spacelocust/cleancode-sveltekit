import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sessionTable } from './table/session';
import { userTable } from './table/user';
import { cardTable } from './table/card';

const { MARIADB_URL } = process.env;

export const connection = await mysql.createConnection(MARIADB_URL ?? '');

export const db = drizzle(connection, {
  schema: {
    users: userTable,
    sessions: sessionTable,
    cards: cardTable,
  },
  mode: 'default',
});

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
