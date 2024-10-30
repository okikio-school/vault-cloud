import { defineConfig } from "drizzle-kit";
import { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } from "./src/env.ts";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`
    // host: PGHOST!,
    // database: PGDATABASE!,
    // user: PGUSER!,
    // password: PGPASSWORD!,
    // port: PGPORT!,
    // ssl: false,
  },
});