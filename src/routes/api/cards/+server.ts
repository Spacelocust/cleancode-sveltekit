import { error, json } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { CreateCardSchema } from '$server/validator/card';
import { cardTable } from '$server/drizzle/table/card';
import { randomUUID } from 'node:crypto';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  const { session, user, db } = locals;

  if (!session || !user) {
    error(401, { message: 'Unauthorized' });
  }

  const cards = await db.query.cards.findMany({
    where: (cards, { inArray, eq }) => {
      const tags = url.searchParams.get('tags');
      const whereCondition = eq(cards.userId, session.userId);

      if (!tags) {
        return whereCondition;
      }

      return whereCondition && inArray(cards.tag, tags.split(','));
    },
  });

  return json(cards);
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const { session, user, db } = locals;

  if (!session || !user) {
    error(401, { message: 'Unauthorized.' });
  }

  const body = await request.json();
  const result = safeParse(CreateCardSchema, body);

  if (!result.success) {
    error(400, { message: 'Bad request', errors: result.issues });
  }

  const card = {
    ...result.output,
    userId: session.userId,
    id: randomUUID(),
  };

  await db.insert(cardTable).values(card);

  return json(card, {
    status: 201,
    statusText: 'Created card',
  });
};
