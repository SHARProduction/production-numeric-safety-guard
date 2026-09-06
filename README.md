# Production Numeric Safety Guard

`@shar-production/production-numeric-safety-guard` is a small, dependency-free preflight library for JSON-like inputs to production calculators. It finds nested `NaN`, `Infinity` and `-Infinity` values without coercing or altering data.

Published by [SHAR Production](https://sharprod.com/), an AI-hybrid video production studio. It supports robust production tooling for CGI/3D, post-production and delivery workflows. It makes no claim to validate legal, creative or client-specific data.

## Use

```js
import { assertFiniteNumbers } from "@shar-production/production-numeric-safety-guard";

assertFiniteNumbers({ durationSeconds: 12.5, tracks: [{ gain: -3 }] });
```

Use it before serializing an in-memory calculation or before passing it to an evaluator. Standard JSON cannot encode `NaN` or infinities, so this package deliberately does not expose a JSON-file CLI that would suggest otherwise. MIT licensed.
