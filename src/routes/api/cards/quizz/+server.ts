import { categoryMatchesDate } from '$server/drizzle/query/card';
import { cards } from '$server/drizzle/table/cards';
import { error, json } from '@sveltejs/kit';
import { and, eq, getTableColumns, sql } from 'drizzle-orm';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  const { session, db } = locals;

  if (!session) {
    error(401, { message: 'Unauthorized' });
  }

  let date = new Date(url.searchParams.get('date') ?? '');

  if (Number.isNaN(date.getTime())) {
    date = new Date();
  }

  date.setUTCHours(0, 0, 0, 0);

  const { lastAnsweredAt, userId, ...cardColumns } = getTableColumns(cards);
  const result = await db
    .select(cardColumns)
    .from(cards)
    .where(and(eq(cards.userId, sql.placeholder('userId')), categoryMatchesDate()))
    .prepare()
    .execute({ userId: session.userId, date: date.toISOString() });

  return json(result, {
    statusText: 'All cards of quizz for today',
  });
};
