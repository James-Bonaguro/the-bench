# Workflows

Real workflows run with the Bench. Not theory — actual sequences that get used.

---

## Full Feature Pipeline

**Trigger:** New non-trivial feature
**Steps:**
1. `/plan-ceo-review` — Validate product direction
2. `/plan-eng-review` — Lock architecture
3. Implement — Write the code
4. `/review` — Paranoid structural audit
5. `/code-review` — Multi-agent PR audit
6. `/ship` — Land the branch
7. `/browse` — Verify in real browser
8. `/retro` — Weekly reflection

**Notes:** Not every feature needs every step. Bug fixes skip to implement → `/review` → `/ship`.

---

## Quick Research Loop

**Trigger:** Need to understand an external tool, API, or library
**Steps:**
1. `firecrawl scrape <docs-url>` — Pull docs as markdown
2. Paste into Claude with specific question
3. If deeper context needed: `use context7` for versioned docs

**Notes:** Faster than reading docs manually. Firecrawl + Claude = instant synthesis.

---

## Weekly Review

**Trigger:** End of week
**Steps:**
1. `/retro` — Get shipping metrics
2. Update `metrics/usage.md` — Note what tools got used
3. Copy `evaluation/retro-template.md` and fill it out
4. Scan `memory/` files — Add anything learned this week

**Notes:** Takes 10 minutes. Compounds over time.

---

## Adding a New Tool to The Bench

**Trigger:** Considering a new tool
**Steps:**
1. Run through `evaluation/build-checklist.md`
2. If it passes: document in README, add installation instructions
3. Log the decision in `memory/decisions.md`
4. If it fails: log why in `memory/decisions.md` so you don't re-evaluate it later

**Notes:** The checklist exists to prevent tool sprawl. Use it.

---

*Add workflows as they become repeatable. Remove ones you stop using.*
