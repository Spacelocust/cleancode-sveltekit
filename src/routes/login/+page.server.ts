import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$server/auth';
import { db } from '$server/drizzle/db';
import { userTable } from '$server/drizzle/table/user';
import { eq } from 'drizzle-orm';

export const load = (({ locals }) => {
  if (locals.user) redirect(302, "/");
  
	return {
		username: locals.user?.username
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				error: "Incorrect username or password"
			});
		}

		if (typeof password !== "string" || password.length < 3 || password.length > 255) {
			return fail(400, {
				error: "Incorrect username or password"
			});
		}

		const existingUsers = await db.select({
      id: userTable.id,
      username: userTable.username,
      password: userTable.password
    }).from(userTable).where(eq(userTable.username, username)).limit(1);

		if (existingUsers.length === 0) {
			return fail(400, {
				error: "Incorrect username or password"
			});
		}

		const validPassword = await Bun.password.verify(password, existingUsers[0].password);
		if (!validPassword) {
			return fail(400, {
				error: "Incorrect username or password"
			});
		}

		const session = await auth.createSession(existingUsers[0].id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};


