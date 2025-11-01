import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { Readable } from "node:stream";
import request from "supertest";

/**
 * Convert Node's IncomingMessage/ServerResponse to WHATWG Request/Response
 * so we can call Hono's app.fetch and pipe the result back.
 */
function nodeToFetchRequest(req: IncomingMessage): Request {
  const { method, headers } = req;
  const host = headers.host || "localhost";
  const url = `http://${host}${req.url}`;

  // Clone headers into WHATWG Headers
  const h = new Headers();
  for (const [k, v] of Object.entries(headers)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) h.set(k, v.join(", "));
    else h.set(k, String(v));
  }

  // GET/HEAD have no body; others stream the Node req
  let body: ReadableStream<Uint8Array> | undefined;
  if (method !== "GET" && method !== "HEAD") {
    body = Readable.toWeb(req) as unknown as ReadableStream<Uint8Array>;
  }
  return new Request(url, { method, headers: h, body });
}

async function writeFetchResponseToNode(res: ServerResponse, resp: Response) {
  res.statusCode = resp.status;
  resp.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!resp.body) {
    res.end();
    return;
  }

  // Pipe the ReadableStream to Node response
  const reader = resp.body.getReader();
  const stream = new Readable({
    read() {},
  });

  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        stream.push(Buffer.from(value));
      }
    } catch (err) {
      stream.destroy(err as Error);
    } finally {
      stream.push(null);
    }
  })();

  stream.pipe(res);
}

/** Create a proper Node http.Server from a Hono app for Supertest. */
export function supertestFromHono(app: {
  fetch: (req: Request) => Promise<Response> | Response;
}) {
  const server = createServer(async (req, res) => {
    try {
      const request = nodeToFetchRequest(req);
      const response = await app.fetch(request);
      await writeFetchResponseToNode(res, response);
    } catch (_err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  return request(server);
}
