import { Lucia } from "lucia";

import { dev } from "$app/environment";
import { adapter } from "$server/drizzle/db";

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
