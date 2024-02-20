import type { Card } from '$server/drizzle/table/cards';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
  const { session } = locals;

  if (!session) {
    redirect(303, '/');
  }

  const response = await fetch('/api/cards/quizz', {
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
    if (result.length === 0) {
      redirect(303, '/');
    }

    return {
      cards: result,
    };
  }

  return {
    cards: [],
  };
}) satisfies PageServerLoad;
