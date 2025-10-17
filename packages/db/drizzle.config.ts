import { defineConfig } from "drizzle-kit";
// import { Resource } from "sst";

export default defineConfig({
  schema: "./src/schema/**/*.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
