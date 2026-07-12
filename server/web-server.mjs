import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import worker from "../dist/server/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = path.join(root, "dist", "client");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function staticResponse(request) {
  const url = new URL(request.url);
  const decoded = decodeURIComponent(url.pathname);
  const relative = decoded.replace(/^\/+/, "");
  const filename = path.resolve(clientRoot, relative);
  if (!filename.startsWith(`${clientRoot}${path.sep}`)) return new Response("Not Found", { status: 404 });
  try {
    const body = await fs.readFile(filename);
    return new Response(body, {
      headers: {
        "content-type": contentTypes[path.extname(filename)] || "application/octet-stream",
        "cache-control": relative.startsWith("assets/") ? "public, max-age=31536000, immutable" : "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}

async function toWebRequest(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  return new Request(`http://${req.headers.host || "127.0.0.1"}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method || "GET") ? undefined : body,
    duplex: body ? "half" : undefined,
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const request = await toWebRequest(req);
    const response = await worker.fetch(
      request,
      { ASSETS: { fetch: staticResponse } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(port, "127.0.0.1", () => console.log(`assessment web listening on ${port}`));

