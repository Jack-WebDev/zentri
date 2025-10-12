import { handle } from "hono/aws-lambda";
import { createServer } from "../../app";

const server = createServer();

export const handler = handle(server);
