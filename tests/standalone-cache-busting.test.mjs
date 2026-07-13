import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("standalone page pins the generated app bundle to a content version", async () => {
  const html = await readFile(new URL("../standalone.html", import.meta.url), "utf8");
  assert.match(html, /<script src="app-bundle\.js\?v=[a-f0-9]{12}"><\/script>/);
});

test("bundle builder refreshes the content version on every generated bundle", async () => {
  const source = await readFile(new URL("../scripts/build-bundle.mjs", import.meta.url), "utf8");
  assert.match(source, /createHash\("sha256"\)/);
  assert.match(source, /app-bundle\\\.js/);
  assert.match(source, /bundleVersion/);
});

