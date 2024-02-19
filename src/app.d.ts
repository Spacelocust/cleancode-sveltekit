import type { Auth as AuthType } from "$lib/server/auth";
import type { Session, User } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

declare module "lucia" {
  interface Register {
    Lucia: AuthType;
    DatabaseUserAttributes: {
      username: string;
    };
  }
}
