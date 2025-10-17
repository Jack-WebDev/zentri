import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const sslEnabled =
  !process.env.DATABASE_SSL ||
  process.env.DATABASE_SSL.toLowerCase() !== "false";
const rejectUnauthorized =
  !process.env.DATABASE_SSL_REJECT_UNAUTHORIZED ||
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED.toLowerCase() !== "false";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslEnabled ? { rejectUnauthorized } : undefined,
});

export type DB = NodePgDatabase<typeof schema>;
export const db: DB = drizzle(pool, { schema });

export { schema, eq };
