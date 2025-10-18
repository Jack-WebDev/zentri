import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const ca = process.env.DATABASE_SSL_CA_PEM;
if (!ca) {
  throw new Error(
    "Missing DATABASE_SSL_CA_PEM (paste your RDS CA PEM into this env var)."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});

export type DB = NodePgDatabase<typeof schema>;
export const db: DB = drizzle(pool, { schema });

export { schema, eq };
