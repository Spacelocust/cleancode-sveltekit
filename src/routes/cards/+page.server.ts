import { type Actions, error, fail, redirect } from '@sveltejs/kit';
import { API_HOST_PREFIX } from '$env/static/private';

import type { Card } from '$server/drizzle/table/cards';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
  const { session } = locals;

  if (!session) {
    redirect(303, '/');
  }

  const response = await fetch(`${API_HOST_PREFIX}/cards`, {
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

    const response = await fetch(`${API_HOST_PREFIX}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer, tag }),
    });

    const resultResponse: Card | { message: string } = await response.json();

    if (!response.ok && 'message' in resultResponse && response.status === 400) {
      return fail(response.status, {
        error: resultResponse.message,
      });
    }

    return {
      success: true,
    };
  },
};
