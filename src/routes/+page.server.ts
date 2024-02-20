import { API_HOST_PREFIX } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
  logout: async ({ fetch, locals }) => {
    const { session } = locals;

    if (!session) {
      return fail(401, {
        error: 'Not authenticated',
      });
    }

    const response = await fetch(`${API_HOST_PREFIX}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });

    const result: { message?: string } = await response.json();

    if (!response.ok && result.message) {
      return fail(response.status, {
        error: result.message,
      });
    }

    redirect(302, '/');
  },
};
