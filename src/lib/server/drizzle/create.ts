import { connection } from "./db";
import drizzleConfig from "./drizzle.config";

await connection.query(`CREATE DATABASE IF NOT EXISTS ${drizzleConfig.dbCredentials.database};`);
console.log("Database created");

await connection.end();
console.log("Connection closed");

process.exit();
