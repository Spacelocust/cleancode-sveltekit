import { API_HOST_PREFIX } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

import type { Card } from '$server/drizzle/table/cards';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
  const { session } = locals;

  if (!session) {
    redirect(303, '/');
  }

  const response = await fetch(`${API_HOST_PREFIX}/cards/quizz`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: Card[] | { message?: string } = await response.json();

  if (!Array.isArray(result)) {
    if (!response.ok && result.message) {
      error(401, result.message);
    }

    redirect(303, '/');
  }

  return {
    cards: result,
  };
}) satisfies PageServerLoad;
