import type { Card } from '$server/drizzle/table/cards';
import { type Actions, error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { safeParse, type SchemaIssues } from 'valibot';
import { CreateCardSchema } from '$server/validator/card';

export const load = (async ({ locals, fetch }) => {
  const { session } = locals;

  if (!session) {
    redirect(303, '/');
  }

  const response = await fetch('/api/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: Card[] | { message?: string } = await response.json();

  if (!Array.isArray(result)) {
    if (!response.ok && result.message) {
      return error(401, result.message);
    }
  } else {
    return {
      cards: result,
    };
  }

  return {
    cards: [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  addCard: async ({ request, fetch, locals }) => {
    const { session } = locals;

    if (!session) {
      redirect(303, '/');
    }

    const data = await request.formData();
    const question = (data.get('question') ?? '') as string;
    const answer = (data.get('answer') ?? '') as string;
    const tag = (data.get('tag') ?? '') as string;

    const resultParse = safeParse(CreateCardSchema, { question, answer, tag});

    if (!resultParse.success) {
      return fail(400, { errors: resultParse.issues });
    }

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer, tag }),
    });

    const resultResponse: Card | { message: string, errors: SchemaIssues } = await response.json();

    if (!response.ok && "errors" in resultResponse) {
      return fail(response.status, {
        errors: resultResponse.errors,
      });
    }
  }
};
