import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
  const { session } = locals;

  if (session) {
    redirect(303, '/');
  }

  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const username = (data.get('username') ?? '') as string;
    const password = (data.get('password') ?? '') as string;

    if (username.length < 1 || username.length > 31 || password.length < 3 || password.length > 255) {
      return fail(400, { error: 'Invalid credentials' });
    }

    const response = await event.fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
