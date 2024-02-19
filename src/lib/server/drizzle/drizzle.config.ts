import type { Config } from "drizzle-kit";

import { MARIADB_DATABASE, MARIADB_HOST, MARIADB_ROOT_PASSWORD, MARIADB_ROOT_USER } from "$env/static/private";

export default {
  schema: "./schema/*.ts",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    host: MARIADB_HOST,
    user: MARIADB_ROOT_USER,
    password: MARIADB_ROOT_PASSWORD,
    database: MARIADB_DATABASE,
  },
} satisfies Config;
