import { getNextCategory, getPreviousCategory } from '$server/drizzle/enum';
import { categoryMatchesDate } from '$server/drizzle/query/card';
import { cards } from '$server/drizzle/table/cards';
import { AnswerCardSchema } from '$server/validator/card';
import { error } from '@sveltejs/kit';
import { and, eq, getTableColumns, sql } from 'drizzle-orm';
import { safeParse } from 'valibot';

import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
  const { session, db } = locals;

  if (!session) {
    error(401, { message: 'Unauthorized' });
  }

  const date = new Date();

  date.setUTCHours(0, 0, 0, 0);

  const { lastAnsweredAt, userId, ...cardColumns } = getTableColumns(cards);
  const result = await db
    .select(cardColumns)
    .from(cards)
    .where(
      and(eq(cards.userId, sql.placeholder('userId')), eq(cards.id, sql.placeholder('cardId')), categoryMatchesDate()),
    )
    .limit(1)
    .prepare()
    .execute({ userId: session.userId, cardId: params.cardId, date: date.toISOString() });
  const card = result.at(0);

  if (!card) {
    error(404, { message: 'Card not found' });
  }

  const body = await request.json();
  const parsedBody = safeParse(AnswerCardSchema, body);

  if (!parsedBody.success) {
    error(400, { message: 'Bad request', errors: parsedBody.issues });
  }

  await db
    .update(cards)
    .set({
      lastAnsweredAt: date,
      category: parsedBody.output.isValid ? getNextCategory(card.category) : getPreviousCategory(card.category),
    })
    .where(eq(cards.id, sql.placeholder('cardId')))
    .prepare()
    .execute({ cardId: params.cardId });

  return new Response(JSON.stringify({}), {
    status: 204,
    statusText: 'Answer has been taken into account',
  });
};
