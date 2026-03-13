# Build Checklist

Gate questions before adding a tool to The Bench or shipping a structural change. Every answer should be yes.

---

## Before Adding a Tool

- [ ] Does this add a **fundamentally new** capability the Bench doesn't have?
- [ ] Is this infrastructure-level, not application-level?
- [ ] Would I use this across multiple projects, not just one?
- [ ] Does it have a clear, non-overlapping role vs. existing tools?
- [ ] Can I explain what it does in one sentence?
- [ ] Is it maintained and stable (not experimental/alpha)?
- [ ] Does it work within the Claude Code ecosystem (not against it)?
- [ ] Would removing it leave a real gap?

**If any answer is no:** The tool probably belongs in a separate repo or doesn't belong at all. Log the rejection in `memory/decisions.md`.

---

## Before Shipping a Change

- [ ] Does this solve a real problem I've actually hit?
- [ ] Is this the simplest version that works?
- [ ] Did I avoid adding anything "just in case"?
- [ ] Would I be proud to show this to someone sharp?
- [ ] Can someone act on this tomorrow?

---

*If you're hesitating on the checklist, that's the answer.*
