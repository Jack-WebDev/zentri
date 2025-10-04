import { auth } from "@zentri/auth";
import type { DB } from "@zentri/db"; // ✅ type alias, not value
import { db } from "@zentri/db";
import type { Context as HonoContext } from "hono";

export type CreateContextOptions = { context: HonoContext };

export async function createContext({ context }: CreateContextOptions) {
	const session = await auth.api.getSession({
		headers: context.req.raw.headers,
	});
	return { session, db };
}

// Clear, portable context type
export type Context = {
	session: Awaited<ReturnType<typeof auth.api.getSession>>;
	db: DB;
};
