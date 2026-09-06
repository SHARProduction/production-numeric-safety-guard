import test from "node:test";
import assert from "node:assert/strict";
import { inspectFiniteNumbers, assertFiniteNumbers } from "../src/index.mjs";

test("reports nested non-finite numbers with deterministic paths", () => {
  const result = inspectFiniteNumbers({ durationSeconds: 12, tracks: [{ gain: Infinity }, { offset: NaN }] });
  assert.deepEqual(result, {
    valid: false,
    issues: [
      { code: "NON_FINITE_NUMBER", path: "tracks[0].gain", value: "Infinity" },
      { code: "NON_FINITE_NUMBER", path: "tracks[1].offset", value: "NaN" }
    ]
  });
});

test("accepts finite production calculation inputs", () => {
  const input = { durationSeconds: 12.5, tracks: [{ gain: -3, offset: 0 }], delivery: { bitrateMbps: 42 } };
  assert.deepEqual(inspectFiniteNumbers(input), { valid: true, issues: [] });
  assert.equal(assertFiniteNumbers(input), input);
});

test("assertion rejects a non-finite input with its exact path", () => {
  assert.throws(() => assertFiniteNumbers({ frameRate: -Infinity }), /frameRate/);
});
