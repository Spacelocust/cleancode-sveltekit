import { categories, categoryFrequency } from '$server/drizzle/enum';
import { cards } from '$server/drizzle/table/cards';
import { error, json } from '@sveltejs/kit';
import { and, eq, isNull, or, sql } from 'drizzle-orm';

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

  const result = await db
    .select()
    .from(cards)
    .where(
      and(
        eq(cards.userId, sql.placeholder('userId')),
        or(
          and(eq(cards.category, categories.first), isNull(cards.lastAnsweredAt)),
          ...Object.values(categories)
            .filter((category) => category !== categories.done && category !== categories.first)
            .map((category) =>
              and(
                eq(cards.category, category),
                sql`DATEDIFF(${sql.placeholder('date')}, ${cards.lastAnsweredAt}) >= ${categoryFrequency[category]}`,
              ),
            ),
        ),
      ),
    )
    .prepare()
    .execute({ userId: session.userId, date: date.toISOString() });

  return json(result, {
    statusText: 'All cards of quizz for today',
  });
};
