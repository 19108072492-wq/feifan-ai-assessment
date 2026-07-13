import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("personal report uses a standalone-safe radar without Recharts runtime components", async () => {
  const source = await readFile(new URL("../app/components/ReportView.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /from "recharts"/);
  assert.match(source, /function CapabilityRadar/);
  assert.match(source, /<svg/);
  assert.match(source, /<polygon/);
});

test("generated GitHub Pages bundle does not render undefined chart components", async () => {
  const bundle = await readFile(new URL("../app-bundle.js", import.meta.url), "utf8");
  assert.doesNotMatch(bundle, /PolarAngleAxis,[\s\S]{0,120}ResponsiveContainer[\s\S]{0,20}= \{\};/);
});

