import { randomUUID } from 'node:crypto';
import { type NewCard, cards as cardsSchema } from '$server/drizzle/table/cards';
import { CreateCardSchema } from '$server/validator/card';
import { error, json } from '@sveltejs/kit';
import { safeParse } from 'valibot';

import { categories } from '$server/drizzle/enum';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  const { session, db } = locals;

  if (!session) {
    error(401, { message: 'Unauthorized' });
  }

  const cards = await db.query.cards
    .findMany({
      columns: {
        userId: false,
        lastAnsweredAt: false,
      },
      where: (cards, { inArray, eq, sql }) => {
        const tags = url.searchParams.get('tags');
        const whereCondition = eq(cards.userId, sql.placeholder('userId'));

        if (!tags) {
          return whereCondition;
        }

        return whereCondition && inArray(cards.tag, tags.split(','));
      },
    })
    .prepare()
    .execute({ userId: session.userId });

  return json(cards, {
    statusText: 'Found cards by tag query',
  });
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const { session, db } = locals;

  if (!session) {
    error(401, { message: 'Unauthorized.' });
  }

  const body = await request.json();
  const result = safeParse(CreateCardSchema, body);

  if (!result.success) {
    error(400, { message: 'Bad request', errors: result.issues });
  }

  const card: Omit<NewCard, 'userId'> = {
    id: randomUUID(),
    category: categories.first,
    ...result.output,
  };

  await db.insert(cardsSchema).values({ ...card, userId: session.userId });

  return json(card, {
    status: 201,
    statusText: 'Created card',
  });
};
