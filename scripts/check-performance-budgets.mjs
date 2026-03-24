import { gzipSync } from "node:zlib";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const DIST_DIR = resolve("dist");
const INDEX_HTML_PATH = resolve(DIST_DIR, "index.html");

const BUDGETS = {
  entryJsRawKB: 430,
  entryJsGzipKB: 140,
  entryCssRawKB: 95,
  entryCssGzipKB: 14,
};

function extractAssetPath(html, extension) {
  const matcher = extension === "js"
    ? /src="\/(assets\/[^"]+\.js)"/
    : /href="\/(assets\/[^"]+\.css)"/;

  const match = html.match(matcher);
  if (!match?.[1]) {
    throw new Error(`Unable to find entry ${extension.toUpperCase()} asset in dist/index.html`);
  }

  return resolve(DIST_DIR, match[1]);
}

function sizeKb(path) {
  return statSync(path).size / 1024;
}

function gzipKb(path) {
  const source = readFileSync(path);
  return gzipSync(source).byteLength / 1024;
}

function assertBudget(name, actual, max) {
  if (actual > max) {
    throw new Error(`${name} budget exceeded: ${actual.toFixed(2)} kB > ${max.toFixed(2)} kB`);
  }
}

const indexHtml = readFileSync(INDEX_HTML_PATH, "utf8");
const entryJsPath = extractAssetPath(indexHtml, "js");
const entryCssPath = extractAssetPath(indexHtml, "css");

const metrics = {
  entryJsRawKB: sizeKb(entryJsPath),
  entryJsGzipKB: gzipKb(entryJsPath),
  entryCssRawKB: sizeKb(entryCssPath),
  entryCssGzipKB: gzipKb(entryCssPath),
};

for (const [metricName, value] of Object.entries(metrics)) {
  const budget = BUDGETS[metricName];
  assertBudget(metricName, value, budget);
  console.log(`${metricName}: ${value.toFixed(2)} kB (budget ${budget.toFixed(2)} kB)`);
}

console.log("Performance budgets passed.");
