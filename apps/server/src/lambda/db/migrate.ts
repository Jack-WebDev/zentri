import { resolve } from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

type Mode = "MIGRATE" | "ROLLBACK" | "UP" | "DOWN";
export interface Event {
	mode?: Mode;
}

export const handler = async (_event: Event = {}) => {
	const migrationsFolder = resolve(process.cwd(), "drizzle");
	console.log("Running Drizzle migrations from:", migrationsFolder);

	try {
		await migrate(db, { migrationsFolder });
		console.log("✅ Migrations complete");
		return { ok: true };
	} catch (error) {
		console.error("❌ Migration failed", error);
		return { ok: false, error: String(error) };
	}
};
