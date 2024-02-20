import { auth } from '$server/auth';
import { db } from '$server/drizzle/db';
import { users } from '$server/drizzle/table/users';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
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

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!existingUser) {
      return fail(400, {
        error: 'Invalid credentials',
      });
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password);
    if (!validPassword) {
      return fail(400, {
        error: 'Invalid credentials',
      });
    }

    const session = await auth.createSession(existingUser.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    redirect(302, '/');
  },
};
