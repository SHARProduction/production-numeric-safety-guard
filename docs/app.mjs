import { inspectFiniteNumbers } from "./core.mjs";

const duration = document.querySelector("#duration");
const gain = document.querySelector("#gain");
const inject = document.querySelector("#inject");
const result = document.querySelector("#result");

document.querySelector("#run").addEventListener("click", () => {
  const input = {
    durationSeconds: Number(duration.value),
    tracks: [{ gainDb: inject.checked ? Infinity : Number(gain.value) }]
  };
  const report = inspectFiniteNumbers(input);
  result.className = report.valid ? "ok" : "bad";
  result.textContent = report.valid
    ? "PASS: all supplied runtime numbers are finite."
    : `BLOCKED: ${report.issues.map((issue) => `${issue.code} at ${issue.path}`).join(", ")}`;
});
