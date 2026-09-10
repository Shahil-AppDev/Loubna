/**
 * Robust boolean parsing for feature-flag env vars.
 *
 * A strict `=== "true"` comparison is fragile in practice: a secret set to
 * "True", "TRUE", "1", or with a trailing space/newline (easy to introduce
 * when pasting into a secrets UI) silently evaluates to disabled with no
 * error anywhere — exactly the kind of mismatch that is very hard to
 * diagnose remotely since secret values can never be read back once set.
 */
export function isFeatureEnabled(value: string | undefined | null): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}
