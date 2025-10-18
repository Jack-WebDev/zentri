import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import path from "node:path";
import fs from "node:fs";

const CA_PATH = path.join(process.cwd(), "certs", "af-south-1-bundle.pem");

const ca = fs.readFileSync(CA_PATH, "utf8");

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
