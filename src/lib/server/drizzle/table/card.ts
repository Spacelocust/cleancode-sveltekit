import { mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { userTable } from './user';
import { Categories } from '../enum';

export const cardTable = mysqlTable('card', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  question: varchar('username', {
    length: 255,
  }),
  answer: varchar('password', {
    length: 255,
  }),
  category: mysqlEnum('category', ['', ...Object.values(Categories)]),
  tag: varchar('tag', {
    length: 255,
  }),
  userId: varchar('user_id', {
    length: 255,
  })
    .notNull()
    .references(() => userTable.id),
});
