import { auth } from '$server/auth';
import { users } from '$server/drizzle/table/users';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
  const { session, db } = locals;

  if (session) {
    error(401, { message: 'Already authenticated' });
  }

  const body = await request.json();

  if (typeof body.username !== 'string' || typeof body.password !== 'string') {
    error(401, { message: 'Invalid credentials' });
  }

  const { username, password } = body;
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!existingUser) {
    return error(401, {
      message: 'Invalid credentials',
    });
  }

  const validPassword = await new Argon2id().verify(existingUser.password, password);

  if (!validPassword) {
    return error(401, {
      message: 'Invalid credentials',
    });
  }

  const userSession = await auth.createSession(existingUser.id, {});
  const sessionCookie = auth.createSessionCookie(userSession.id);
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  });

  return json({
    id: existingUser.id,
    username: existingUser.username,
  });
};
