import { datetime, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { categories } from '../enum';
import { users } from './users';

export const cards = mysqlTable('cards', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  question: varchar('question', {
    length: 255,
  }).notNull(),
  answer: varchar('answer', {
    length: 255,
  }).notNull(),
  category: mysqlEnum('category', [
    categories.first,
    ...Object.values(categories).filter((category) => category !== categories.first),
  ]).notNull(),
  tag: varchar('tag', {
    length: 255,
  }),
  lastAnsweredAt: datetime('last_answered_at'),
  userId: varchar('user_id', {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;
