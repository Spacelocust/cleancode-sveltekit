import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
	logout: async ({ locals, cookies }) => {
    const { session } = locals;

		if (!session) {
			return fail(401, {
        error: "Not authenticated"
      });
		}

		await auth.invalidateSession(session.id);
		const sessionCookie = auth.createBlankSessionCookie();

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};
