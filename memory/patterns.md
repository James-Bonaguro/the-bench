# Patterns

Reusable patterns that work repeatedly across projects and sessions.

---

## Prompt Patterns

### Context-First Prompting
**When:** Starting any non-trivial task with Claude Code
**Pattern:** State the goal, provide constraints, then ask for the action. Don't bury the request.
**Example:** "I need to add auth to this Next.js app. We're using Supabase. No third-party auth libraries. Build the middleware."

### Scope Anchoring
**When:** A task could spiral into over-engineering
**Pattern:** Define what's in scope AND what's explicitly out of scope before starting.
**Example:** "In scope: add the API endpoint. Out of scope: refactoring the existing routes, adding tests for unrelated endpoints."

---

## Workflow Patterns

### Ship-Then-Polish
**When:** Building anything new
**Pattern:** Get the working version committed first. Polish in a separate pass. Never mix building and refining in the same session.

### Capability Check Before Build
**When:** About to add a tool or dependency
**Pattern:** Run through `evaluation/build-checklist.md` before committing to any addition.

---

## Tool Patterns

### Firecrawl for Context Loading
**When:** Need to understand a library, competitor, or external resource
**Pattern:** `firecrawl scrape <url> --format markdown` → paste into Claude as context. Faster than reading docs manually.

### /review Before /ship
**When:** Any branch that touches core logic
**Pattern:** Always run `/review` before `/ship`. The paranoid-engineer pass catches things tests don't.

---

*Add new patterns as you discover them. Delete ones that stop being useful.*
