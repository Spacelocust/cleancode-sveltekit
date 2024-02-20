import { API_HOST_PREFIX } from '$env/static/private';
import { type Actions, fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  answer: async ({ request, fetch, locals, params }) => {
    const { session } = locals;

    if (!session) {
      redirect(303, '/');
    }

    const data = await request.formData();
    const answer = (data.get('answer') ?? '') as string;
    const supposedAnswer = (data.get('supposedAnswer') ?? '') as string;

    if (answer.length === 0 || supposedAnswer.length === 0) {
      return fail(400, {
        error: 'You must provide an answer.',
      });
    }

    const isValid = answer.trim() === supposedAnswer.trim();
    const response = await fetch(`${API_HOST_PREFIX}/cards/${params.cardId}/answer`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isValid }),
    });

    const result = await response.json();

    if (!response.ok && 'message' in result && result.status === 400) {
      return fail(result.status, {
        error: result.message,
      });
    }

    return {
      isValid,
    };
  },
};
