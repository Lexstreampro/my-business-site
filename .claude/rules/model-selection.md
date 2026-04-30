# Model Selection Rule

Choose your model based on the task, not convenience. Precision work deserves Opus. Iteration suits Sonnet. Research uses Haiku.

## Decision Tree

| Task Type | Model | Why | Token Cost |
|-----------|-------|-----|------------|
| **Screenshot comparison + design refinement** | Opus 4.7 | Visual precision, pixel-perfect matching, complex CSS reasoning | Higher |
| **Copy writing + brand voice** | Opus 4.7 | Tone consistency, messaging precision, brand authority | Higher |
| **Building new sections (first pass)** | Opus 4.7 | Quality on first build matters most — fewer refinement rounds save tokens overall | Higher |
| **QA testing + mobile checks** | Sonnet 4.6 | Fast iteration, good enough for validation, acceptable quality/speed tradeoff | Medium |
| **Bug fixes + small tweaks** | Sonnet 4.6 | Balanced speed and quality for incremental changes | Medium |
| **Research + reference lookups** | Haiku 4.5 | Pure information retrieval, minimal reasoning needed | Low |
| **Acceptance checklist runs** | Haiku 4.5 | Fast verification against criteria, cost-efficient | Low |

## Examples

- **Preloader rebuild (Session 3)**: Opus 4.7 — complex SVG + CSS animation + castle silhouette positioning. Needed precision.
- **Mobile QA pass on 390px**: Sonnet 4.6 — checking wrapping, spacing, tap targets. Validation work.
- **Find inspiration screenshots**: Haiku 4.5 — search for files, list options, retrieve references.

## Anti-Pattern (Do Not)
- Don't use Haiku for design/copy work — false economy. Haiku output needs Opus-level refinement, costing more in the end.
- Don't use Opus for simple lookups — waste of capability and tokens.
- Don't stay in one model all session — match model to task type.

## Session Protocol
At the start of each session:
1. Read the spec (HANDOVER.md, CLAUDE.md, rules/)
2. Identify the task type from the decision tree above
3. Confirm you're using the recommended model
4. If current model doesn't match, switch before proceeding

**This is not optional. Elite execution requires the right tool for the job.**
