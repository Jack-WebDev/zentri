import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export type DB = NodePgDatabase<typeof schema>;
export const db: DB = drizzle(pool, { schema });

export { schema, eq };
