# Decisions

Structural decisions and the reasoning behind them. Prevents re-litigating settled questions.

---

## Tool Choices

### Claude Code as the primary execution layer
**Date:** 2026-03
**Decision:** All Bench tooling orbits Claude Code. No competing coding assistants.
**Rationale:** One execution layer means one mental model. Aider, OpenInterpreter, and similar tools were evaluated and rejected as redundant.
**Alternatives rejected:** Aider (competing git-aware workflow), OpenInterpreter (redundant execution agent)

### Firecrawl for web ingestion
**Date:** 2026-03
**Decision:** Firecrawl CLI handles all web scraping/crawling. No Puppeteer scripts, no custom scrapers.
**Rationale:** Single tool, API-based, handles scrape/crawl/map/search. Covers the full web ingestion capability without maintaining custom code.

---

## Architecture

### The Bench is a config repo, not a runtime
**Date:** 2026-03
**Decision:** The Bench documents and configures tools. It doesn't run services or host applications.
**Rationale:** Installation is per-machine. The repo is the source of truth for what should be installed and how, not a deployment artifact.

### Memory and evaluation are markdown, not databases
**Date:** 2026-03
**Decision:** All memory and evaluation layers use plain markdown files. No SQLite, no JSON stores, no external services.
**Rationale:** Markdown is readable, diffable, git-friendly, and requires zero infrastructure. Matches the Bench philosophy.

---

## Scope

### No standalone agents in The Bench
**Date:** 2026-03
**Decision:** Standalone agents, experimental workflows, and domain-specific pipelines go in separate repos.
**Rationale:** The Bench is infrastructure. Agents are applications. Mixing them creates scope creep.

---

*Log every non-obvious decision. Future you will thank present you.*
