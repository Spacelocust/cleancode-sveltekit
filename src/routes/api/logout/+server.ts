import { auth } from '$server/auth';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies }) => {
  const { session } = locals;

  if (!session) {
    return error(401, {
      message: 'Not authenticated',
    });
  }

  await auth.invalidateSession(session.id);
  const sessionCookie = auth.createBlankSessionCookie();

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  });

  return json({});
};
