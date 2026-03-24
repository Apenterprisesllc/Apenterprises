# Performance Operations Playbook

## Weekly Dashboard Checklist
- Review p75 LCP, INP, and CLS from `/api/rum` logs.
- Compare current bundle sizes against `perf:budget` thresholds.
- Track quote submit success rate and latency percentiles.
- List top 3 regressions and assign owners with due dates.

## Release Checklist
- `npm run build` passes.
- `npm run perf:budget` passes.
- Lighthouse assertions pass for `/`, `/services`, `/quote`.
- Manual visual QA confirms no noticeable design or animation regressions.
- Quote flow works end-to-end with successful API response.

## Dependency Policy
- New dependency PRs must include runtime justification and bundle impact.
- Unused runtime dependencies are removed in the same sprint when identified.
- UI utility modules not imported by routes/components are not allowed to inflate Tailwind source scanning.

