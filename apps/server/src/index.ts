import { serve } from "@hono/node-server";
import { createServer } from "./app";

const server = createServer();

serve(
	{ fetch: server.fetch, port: Number(process.env.SERVER_PORT) || 3000 },
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
