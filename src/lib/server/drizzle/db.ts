import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sessions } from './table/sessions';
import { users } from './table/users';
import { cards } from './table/cards';

const { MARIADB_URL } = process.env;

export const connection = await mysql.createConnection(MARIADB_URL ?? '');

export const db = drizzle(connection, {
  schema: {
    users,
    sessions,
    cards,
  },
  mode: 'default',
});

export const adapter = new DrizzleMySQLAdapter(db, sessions, users);
