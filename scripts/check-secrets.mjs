// Fails when build output that can reach a browser contains a credential.
// Runs as `postbuild`, so Vercel checks every deployment against its real token.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const PUBLIC_ROOTS = [".next/static"];
// Prerendered pages and RSC payloads served to browsers.
const PRERENDER_ROOT = ".next/server/app";
const PRERENDER_FILE = /\.(html|rsc|body)$/;

const patterns = [
  ["GitHub fine-grained token", /github_pat_[A-Za-z0-9_]{20,}/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{36,}/],
];
const configured = process.env.GITHUB_CONTRIBUTIONS_TOKEN?.trim();

async function* files(dir, filter = () => true) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path, filter);
    else if (filter(entry.name)) yield path;
  }
}

async function scan() {
  const findings = [];
  const targets = [...PUBLIC_ROOTS.map((root) => files(root)), files(PRERENDER_ROOT, (name) => PRERENDER_FILE.test(name))];
  let count = 0;
  for (const target of targets) {
    for await (const path of target) {
      count += 1;
      const text = await readFile(path, "utf8");
      for (const [name, pattern] of patterns) if (pattern.test(text)) findings.push(`${path}: ${name}`);
      if (configured && text.includes(configured)) findings.push(`${path}: configured GITHUB_CONTRIBUTIONS_TOKEN`);
    }
  }
  return { count, findings };
}

try {
  const { count, findings } = await scan();
  if (findings.length > 0) {
    // Report locations only, never the matched value.
    console.error(`check-secrets: credential found in browser-reachable output:\n${findings.join("\n")}`);
    process.exit(1);
  }
  console.log(`check-secrets: scanned ${count} files, no credentials found`);
} catch (error) {
  console.error(`check-secrets: cannot scan build output (${error.code ?? error.message}). Run next build first.`);
  process.exit(1);
}
