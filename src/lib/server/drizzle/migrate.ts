import { migrate } from "drizzle-orm/mysql2/migrator";

import { connection, db } from "$lib/server/drizzle/db";
import drizzleConfig from "$lib/server/drizzle/drizzle.config";

await migrate(db, { migrationsFolder: drizzleConfig.out });

await connection.end();
