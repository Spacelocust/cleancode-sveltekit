import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ locals }) => {
  const { session, user } = locals;

  if (!session || !user) {
    error(401, { message: 'Unauthorized' });
  }

  return json({ message: 'TODO' });
};
