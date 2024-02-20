import { mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { users } from './users';
import { categories } from '../enum';

export const cards = mysqlTable('cards', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  question: varchar('question', {
    length: 255,
  }),
  answer: varchar('answer', {
    length: 255,
  }),
  category: mysqlEnum('category', Object.values(categories) as [string, ...string[]]),
  tag: varchar('tag', {
    length: 255,
  }),
  userId: varchar('user_id', {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
});
