# AI Software House Live Operations

Dogfood path: Founder objective → Product → Requirements → Architect → Engineering → QA → Security → Release proposal → Founder gate.

Coding agents produce isolated patch candidates only — never auto-deploy.

Ops surfaces: `/admin/workforce-activation`, Queue/Runtime tick, `npm run workforce:*`.

Failure honesty: provider missing → fail closed; QA reject → revision; memory stays candidate.
