import { defineConfig } from "drizzle-kit";
// import { Resource } from "sst";

export default defineConfig({
  schema: ["./src/db/schema/**/*.ts", "./src/db/schema.ts"],
  out: "./src/db/migrations",
  dialect: "postgresql",
  // dbCredentials: {
  //   url: Resource.Database.url || process.env.DATABASE_URL,
  // },
});
