import "server-only";

// The only module that reads secrets. ESLint blocks `process.env` elsewhere.
// Fine-grained personal access tokens only (docs/ARCHITECTURE.md §10).
const FINE_GRAINED_TOKEN = /^github_pat_[A-Za-z0-9_]{20,}$/;

/**
 * The GitHub contributions token, or undefined when unset or not a fine-grained token.
 * Never pass the value to client code or include it in logs.
 */
export function githubContributionsToken(): string | undefined {
  const value = process.env.GITHUB_CONTRIBUTIONS_TOKEN?.trim();
  if (!value) return undefined;
  if (!FINE_GRAINED_TOKEN.test(value)) {
    console.warn("[env] GITHUB_CONTRIBUTIONS_TOKEN is not a fine-grained token; ignoring it");
    return undefined;
  }
  return value;
}
