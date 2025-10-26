import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export type DB = NodePgDatabase<typeof schema>;
export const db: DB = drizzle(pool, { schema });

export { schema, eq };
