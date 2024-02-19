import { auth } from "$lib/server/auth";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const authorizationHeader = event.request.headers.get("Authorization");
  const sessionId = auth.readBearerToken(authorizationHeader ?? "");

  if (!sessionId) {
    return new Response(null, {
      status: 401,
    });
  }

  const { session, user } = await auth.validateSession(sessionId);
  if (session?.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};
