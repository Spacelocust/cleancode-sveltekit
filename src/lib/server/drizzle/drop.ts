import { connection } from './db';
import drizzleConfig from './drizzle.config';

await connection.query(`DROP DATABASE IF EXISTS ${drizzleConfig.dbCredentials.database};`);
console.log('Database dropped');

await connection.end();
console.log('Connection closed');

process.exit();
