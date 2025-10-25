import { drizzle } from "drizzle-orm/node-postgres";
import { Resource } from "sst";

const url = Resource.Database.url;

export const db = drizzle({
  connection: {
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  },
});
