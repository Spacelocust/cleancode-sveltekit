import type { Card } from '$server/drizzle/table/cards';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
  const { session } = locals;

  if (!session) {
    redirect(303, '/');
  }

  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  answer: async ({ request, fetch, locals, params }) => {
    const { session } = locals;
    const { cardId } = params;

    if (!session) {
      redirect(303, '/');
    }

    if (!cardId) {
      return fail(400, {
        error: 'Bad request',
      });
    }

    const data = await request.formData();
    const answer = (data.get('answer') ?? '') as string;
    const supposedAnswer = (data.get('supposedAnswer') ?? '') as string;

    if (answer.length === 0 || supposedAnswer.length === 0) {
      return fail(400, {
        error: 'you must provide an answer',
      });
    }

    const response = await fetch(`/api/cards/${cardId}/answer`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isValid: answer.trim() === supposedAnswer.trim() }),
    });

    const result = await response.json();

    if (!response.ok && 'message' in result && result.status === 400) {
      return fail(result.status, {
        error: result.message,
      });
    }
  },
};
