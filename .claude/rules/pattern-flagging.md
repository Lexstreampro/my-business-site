# Pattern Flagging & Rule Creation

Claude should proactively flag emerging patterns that warrant becoming rules. This ensures you catch mistakes you might not see, while avoiding false positives or fixes that cause problems elsewhere.

## What Qualifies as a Pattern

**Flag it when:**
- Claude makes the same mistake >2 times in a session (e.g., uses wrong colour, breaks mobile layout at 390px)
- A decision was made once, then forgotten in a later task (e.g., "we removed 'Priority' wording" then it reappears)
- A rule exists but was ignored or misapplied (e.g., copy used discount language despite brand-voice.md)
- A new best practice emerged from building (e.g., "all images need loading='lazy' for performance")

**Don't flag:**
- One-off mistakes (typos, single oversight)
- Disagreements on taste or approach (not a pattern, a judgment call)
- External constraints (browser bugs, third-party API limits)
- Future "what if" scenarios (only flag what actually happened)

## How Claude Flags a Pattern

**In the session summary or mid-task note:**
```
🚩 PATTERN FLAG: [What was observed]
   - Occurred: [when/where]
   - Impact: [what went wrong]
   - Suggested rule: [proposed rule name + brief rule]
   - Validation: [why this fix is safe and doesn't break other things]
   - Action: Approve rule creation? Yes / No / Discuss
```

**Example:**
```
🚩 PATTERN FLAG: Mobile nav hamburger visibility
   - Occurred: Mobile nav menu didn't show on md: breakpoint (only lg:)
   - Impact: iPad users (768px) couldn't access nav menu
   - Suggested rule: "Mobile menu must show at md: and below (not just lg:)"
   - Validation: Checked all other nav-dependent sections — none rely on md: hiding the menu
   - Action: Create rules/breakpoint-conventions.md
```

## Validation Criteria (Before Creating Rule)

Before flagging a pattern as a rule, verify:
- [ ] **Scope** — does the fix only affect what it's meant to fix?
- [ ] **No regressions** — test that related features still work (e.g., if changing nav breakpoint, check desktop nav still hides/shows correctly)
- [ ] **Consistency** — would this rule apply to future sections too, or is it one-off?
- [ ] **Not contradicting existing rules** — check model-selection.md, design-rules.md, etc. for conflicts
- [ ] **Genuine** — is this a real pattern, not a one-time typo?

## Creating the Rule

Once you approve a pattern flag:
1. I create a new rule file (e.g., `rules/breakpoint-conventions.md`)
2. Rule includes: what the pattern is, why it matters, how to apply it, examples of right/wrong
3. Add reference to this new rule in `.claude/CLAUDE.md` (update session notes)
4. Commit the new rule to git

## Real Examples (Session 3+)

**Session 3 pattern (hypothetical):**
```
🚩 PATTERN FLAG: Mobile nav breakpoint inconsistency
   - Occurred: Hamburger menu hidden on md: but nav bar shows at md:
   - Impact: iPad users (768px) have confusing nav state
   - Suggested rule: "Mobile menu must show at md: and below (consistent with sticky CTA)"
   - Validation: Checked all sections — no feature relies on md: hiding the menu
   - Action: Create rules/breakpoint-conventions.md
```

**Another real example:**
```
🚩 PATTERN FLAG: Placeholder copy creeping back in
   - Occurred: "Request Booking" changed to "Request Priority Booking" in build, violating Session 3 spec
   - Impact: Brand voice inconsistency, contradicts locked decision
   - Suggested rule: "Search for 'Priority' before each session end; auto-remove if found"
   - Validation: Search is simple, no side effects
   - Action: Add to workflow.md checklist
```

## Generic Pattern Examples

| Pattern | Rule Name | Example |
|---------|-----------|---------|
| Repeated colour mismatches | design-tokens-checklist.md | "Always search for old hex codes when colour changes" |
| Mobile breakpoint confusion | breakpoint-conventions.md | "Mobile menu shows at md: and below (not just lg:)" |
| Copy voice drift | brand-voice-enforcement.md | "Search for 'Priority', 'discount', 'best prices' before session end" |
| Missing lazy-load on images | performance-rules.md | "All images with loading='lazy' except above-fold" |
| Form field validation | form-conventions.md | "Required fields marked with * and aria-required" |

## Frequency

- **Flag patterns as they emerge** — don't wait until end of session
- **Review flagged patterns quarterly** — some may evolve, others may resolve
- **Prune rules that are no longer needed** — treat rules as living code (per Nick's guidance)
