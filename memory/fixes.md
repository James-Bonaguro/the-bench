# Fixes

Recurring troubleshooting notes. When you hit it twice, write it down.

---

## Git

### Push rejected — branch name mismatch
**Symptom:** `git push` returns 403
**Cause:** Branch name doesn't match expected pattern (e.g., must start with `claude/` for Claude Code sessions)
**Fix:** Check branch name matches the session's required pattern. Rename with `git branch -m <correct-name>`.

### Submodule shows empty directory
**Symptom:** Cloned repo but submodule folder is empty
**Cause:** Submodules aren't initialized by default on clone
**Fix:** `git submodule update --init --recursive`

---

## Environment

### MCP server not responding
**Symptom:** `use context7` in prompt does nothing or errors
**Cause:** MCP server not installed or misconfigured
**Fix:** Reinstall: `claude mcp add --transport http context7 https://mcp.context7.com/mcp`

### Playwright browser won't start
**Symptom:** `/browse` fails on first use
**Cause:** Chromium not installed or Bun not available
**Fix:** Ensure Bun v1.0+ is installed. Run `bunx playwright install chromium` if needed.

---

## Tools

### Firecrawl returns empty content
**Symptom:** `firecrawl scrape` returns blank or minimal content
**Cause:** Site requires JavaScript rendering or blocks bots
**Fix:** Try `firecrawl crawl` instead of `scrape`. Some sites need the full crawl pipeline. Check credits with `firecrawl --status`.

---

*Only add fixes for problems you've actually hit. Not hypotheticals.*
