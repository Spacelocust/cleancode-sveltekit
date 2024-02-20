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
  answer: async (event) => {
    const data = await event.request.formData();
    const cardId = (data.get('cardId') ?? '') as string;

    const response = await event.fetch(`/api/cards/${cardId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });

    const result: { id: number; username: string; message?: string } = await response.json();

    if (!response.ok && result.message) {
      return fail(response.status, {
        error: result.message,
      });
    }

    redirect(302, '/');
  },
};
