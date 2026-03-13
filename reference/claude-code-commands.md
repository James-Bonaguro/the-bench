# Claude Code Commands — Quick Reference

All Bench slash commands and when to reach for them.

---

## Workflow Commands

| Command | Mode | When to Use |
|---------|------|-------------|
| `/plan-ceo-review` | Founder / CEO | Starting a new feature. Validating product direction before building. |
| `/plan-eng-review` | Tech lead | After product direction is locked. Need architecture, diagrams, test plans. |
| `/review` | Paranoid staff engineer | After implementation. Looking for bugs that pass CI but break production. |
| `/code-review` | Multi-agent audit | Before opening a PR. 5 parallel agents find structural issues. |
| `/ship` | Release engineer | Branch is ready. Sync, test, push, open PR. |
| `/browse` | QA engineer | After deploy. Navigate real browser, test flows, check console. |
| `/retro` | Engineering manager | End of week. Shipping metrics and velocity analysis. |

## Utility Commands

| Command | What It Does |
|---------|-------------|
| `/ralph-loop` | Autonomous iteration. Give it a task + completion criteria, let it cook. |
| `/ralph-loop:cancel-ralph` | Stop a running Ralph Loop. |
| `/help` | List available commands. |

## MCP Triggers

| Trigger | What It Does |
|---------|-------------|
| `use context7` | Pulls live, version-specific library docs into the prompt. |
| Claude Memory | Automatic. Stores/retrieves entities, relations, and observations across sessions. |

## Recommended Sequences

**Full feature:** `/plan-ceo-review` → `/plan-eng-review` → implement → `/review` → `/code-review` → `/ship` → `/browse`

**Quick fix:** implement → `/review` → `/ship`

**Research:** `firecrawl scrape <url>` → ask Claude → `use context7` if needed

**End of week:** `/retro` → update `metrics/usage.md` → fill out retro template

---

*This is a cheat sheet, not documentation. For details, see the README.*
