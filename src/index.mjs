const displayNumber = (value) => Number.isNaN(value) ? "NaN" : String(value);

/**
 * Inspects JSON-like data before a production calculator receives it.
 * It never coerces values or mutates the supplied input.
 */
export function inspectFiniteNumbers(input) {
  const issues = [];
  const seen = new WeakSet();

  const visit = (value, path) => {
    if (typeof value === "number") {
      if (!Number.isFinite(value)) issues.push({ code: "NON_FINITE_NUMBER", path, value: displayNumber(value) });
      return;
    }
    if (!value || typeof value !== "object") return;
    if (seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    for (const key of Object.keys(value).sort()) {
      visit(value[key], path ? `${path}.${key}` : key);
    }
  };

  visit(input, "");
  return { valid: issues.length === 0, issues };
}

/** Returns the original input or throws a stable preflight error. */
export function assertFiniteNumbers(input) {
  const result = inspectFiniteNumbers(input);
  if (!result.valid) {
    const error = new TypeError(`NON_FINITE_NUMBER at ${result.issues.map((issue) => issue.path).join(", ")}`);
    error.code = "NON_FINITE_NUMBER";
    error.issues = result.issues;
    throw error;
  }
  return input;
}
