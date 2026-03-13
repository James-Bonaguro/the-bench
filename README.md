# the-bench

**A Claude Code operational toolkit — skills, plugins, and MCP configs for high-velocity development.**

Named after the hockey bench: your full squad, ready to deploy the right player for the right moment. Every tool here serves a specific cognitive mode. You don't blur planning with shipping. You don't blur review with ideation. You pick the right brain, activate it, and execute.

Built by [James Bonaguro](https://github.com/James-Bonaguro) — founder of Intersection Strategies LLC.

---

## What's on the Bench

| Tool | Type | Trigger | Mode |
|------|------|---------|------|
| Context7 | MCP Server | `use context7` in prompt | Live library docs |
| Claude Memory | MCP Server | Automatic | Persistent knowledge graph |
| Ralph Loop | Plugin | `/ralph-loop` | Autonomous iteration |
| Code Review | Plugin | `/code-review` | Multi-agent PR audit |
| gstack: Plan (CEO) | Skill | `/plan-ceo-review` | Founder / product vision |
| gstack: Plan (Eng) | Skill | `/plan-eng-review` | Architecture / tech lead |
| gstack: Review | Skill | `/review` | Paranoid staff engineer |
| gstack: Ship | Skill | `/ship` | Release engineer |
| gstack: Browse | Skill | `/browse` | QA with real eyes |
| gstack: Retro | Skill | `/retro` | Shipping velocity analysis |
| Frontend Design | Skill | Automatic | Production-grade UI |
| Autoresearch | Agent Tool | Manual | Autonomous LLM research |

---

## MCP Servers

### Context7

**What it does:** Pulls up-to-date, version-specific documentation and code examples directly into your prompts. Instead of Claude hallucinating outdated APIs from training data, Context7 fetches the real docs at prompt time.

**When to use it:** Any time you're writing code that touches a library, framework, or SDK. Especially critical for fast-moving targets like Next.js, React, Tailwind, Supabase, or anything where the API shifts between versions.

**How to use it:** Add `use context7` to any coding prompt. That's it. Context7 resolves the library, pulls relevant docs, and injects them into Claude's context.

```
Build a Next.js 14 middleware that checks for a valid JWT. use context7
```

You can also specify a library directly:

```
Set up Supabase auth. use library /supabase/supabase
```

**Configuration:**
- Installed via: `claude mcp add --transport http context7 https://mcp.context7.com/mcp`
- Optional API key for higher rate limits: [context7.com/dashboard](https://context7.com/dashboard)
- To add your key: `claude mcp remove context7 && claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: YOUR_KEY"`

---

### Claude Memory

**What it does:** Gives Claude Code a persistent knowledge graph that survives across sessions. It stores entities (people, projects, concepts), relations between them, and observations (facts, notes, context). When you start a new session, Claude can query this graph to recall prior decisions, architecture choices, and project state.

**When to use it:** You don't actively "use" it — Claude calls it automatically when it needs to store or retrieve information. But you can prompt it explicitly:

```
Remember that we chose Drizzle over Prisma for this project because of edge runtime compatibility.
```

```
What do you remember about our auth architecture?
```

**What it stores:**
- Entities: people, projects, technologies, decisions
- Relations: "project X uses technology Y", "person A owns module B"
- Observations: facts, notes, and contextual details attached to entities

**Configuration:**
- Installed via: `claude mcp add memory -- npx -y @modelcontextprotocol/server-memory`
- Data stored locally: `~/.claude-memory/memory.db`
- All data stays on your machine — nothing leaves your local filesystem

---

## Plugins

### Ralph Loop

**What it does:** Autonomous iterative development loops. You give Claude a task with clear success criteria, and it works on it repeatedly — seeing its own prior output each iteration — until it either hits the completion condition or reaches your iteration limit. Based on Geoffrey Huntley's "Ralph Wiggum" technique.

**When to use it:**
- Well-defined tasks with clear pass/fail criteria (tests passing, coverage thresholds, specific functionality working)
- Greenfield features where you want Claude to iterate toward a working solution
- Bug fixes where the fix can be verified automatically
- Any task that benefits from "let it cook" — you walk away, it keeps refining

**When NOT to use it:**
- Vague or open-ended tasks without clear completion criteria
- Tasks requiring human judgment at each step
- Quick one-shot changes that don't need iteration

**How to use it:**

```
/ralph-loop "Build a REST API for todos. When complete:
- All CRUD endpoints working
- Input validation in place
- Tests passing (coverage > 80%)
- README with API docs
Output: DONE" --max-iterations 20 --completion-promise "DONE"
```

**Key flags:**
- `--max-iterations <n>` — Safety net. Always set this. Default is unlimited.
- `--completion-promise "<text>"` — Exact string that signals "I'm done." Claude outputs this when it believes the task is complete.

**Tips:**
- Always set `--max-iterations`. 10-20 is reasonable for most tasks.
- Write specific success criteria, not vague goals. "Build a todo API" is bad. "All CRUD endpoints working with input validation and 80% test coverage" is good.
- Include fallback instructions: "After 15 iterations, if not complete, document what's blocking and suggest alternatives."
- Don't aim for perfect on the first prompt. The loop handles refinement — that's the whole point.

**Cancel:** `/ralph-loop:cancel-ralph`

---

### Code Review

**What it does:** Launches 5 parallel Sonnet agents that independently audit your PR from different angles:

1. **CLAUDE.md compliance** — checks your changes against project rules
2. **Bug detection** — finds logic errors, race conditions, edge cases
3. **Git history context** — analyzes changes in the context of recent commits
4. **PR comment review** — checks for issues flagged in previous PR discussions
5. **Code comment verification** — ensures comments match actual behavior

Each finding gets a confidence score (0-100). Only issues scoring 80+ are surfaced, which dramatically cuts false positives.

**When to use it:**
- Before opening a PR (local review to catch issues early)
- On any PR branch to get a deep structural audit
- After implementing fixes to verify you didn't introduce new problems

**How to use it:**

```
/code-review
```

Output goes to your terminal. To post findings directly as GitHub PR comments:

```
/code-review --comment
```

**What it catches that CI doesn't:**
- N+1 queries
- Race conditions
- Trust boundary violations
- Stale reads
- Missing error handling
- Tests that pass while missing the real failure mode

**What it ignores:**
- Style nitpicks (formatting, naming preferences)
- Closed, draft, automated, or already-reviewed PRs (auto-skipped)

---

## gstack Skills

Created by [Garry Tan](https://x.com/garrytan) (President & CEO, Y Combinator). Six opinionated workflow skills that give Claude Code explicit cognitive modes instead of one generic assistant.

The core philosophy: planning is not review. Review is not shipping. Founder taste is not engineering rigor. If you blur them together, you get mediocre output. gstack gives you explicit gears.

### /plan-ceo-review

**Mode:** Founder / CEO

**What it does:** Pressure-tests whether you're building the right thing before you build anything. Forces the "what's the 10-star version?" question. This is not about implementation — it's about product direction, user empathy, and ambition.

**When to use it:**
- At the start of any new feature or project
- When you have a ticket or request and want to question whether it's the right scope
- When you want to think like a founder, not an engineer

**Example flow:**

```
I want to add photo upload for sellers in my listing app.

/plan-ceo-review
```

Claude won't accept "add a file picker" as the feature. It'll push toward: What's the real job? Can we auto-identify the product? Pull specs from the web? Draft the listing? Suggest the best hero image? What makes this feel magical instead of like a dead form from 2007?

---

### /plan-eng-review

**Mode:** Engineering manager / Tech lead

**What it does:** Once the product direction is locked, this mode builds the technical spine. Architecture, system boundaries, data flow, state transitions, failure modes, edge cases, trust boundaries, test coverage. Forces diagrams — which is the key unlock, because LLMs get dramatically more rigorous when you make them draw the system.

**When to use it:**
- After `/plan-ceo-review` has locked the product direction
- Before writing any code on a complex feature
- When you need architecture diagrams, state machines, or test matrices

**What it produces:**
- Architecture diagrams
- Sequence diagrams
- State machine models
- Data flow diagrams
- Test matrices
- Failure mode analysis

---

### /review

**Mode:** Paranoid staff engineer

**What it does:** Structural code audit focused on bugs that pass CI but blow up in production. This is not a style pass. It's looking for the things that will wake you up at 3am.

**When to use it:**
- After implementation, before shipping
- When tests are green but you want a second pair of paranoid eyes
- On any branch that touches auth, payments, data mutations, or concurrency

**What it looks for:**
- N+1 queries
- Race conditions
- Stale reads
- Trust boundary violations
- Missing indexes
- Broken invariants
- Bad retry logic
- Tests that pass while missing the real failure mode
- Prompt injection vectors (if using LLM-generated content)

---

### /ship

**Mode:** Release engineer

**What it does:** The final mile. Syncs with main, runs tests, checks branch state, pushes, opens or updates the PR. For a ready branch — not for deciding what to build.

**When to use it:**
- When the thinking is done and the branch needs to land
- After `/review` has cleared the code
- When you want to stop procrastinating the boring release hygiene

**What it handles:**
- Sync with main
- Run tests
- Check for weird branch state
- Update changelog/version metadata if the repo expects it
- Push the branch
- Open or update the PR

---

### /browse

**Mode:** QA engineer with real eyes

**What it does:** Gives Claude a persistent Chromium browser. It can navigate to URLs, fill forms, click buttons, take screenshots, read them, check console errors, and verify full user flows. A complete QA pass without you opening a browser.

**When to use it:**
- After pushing to staging — verify the deploy
- Testing auth flows, form submissions, multi-step wizards
- Checking for console errors, broken layouts, missing assets
- Comparing pages across environments
- Any time Claude needs to see your actual running app

**Example:**

```
/browse staging.myapp.com — log in, test the signup flow, check every page I changed
```

Claude will navigate, fill forms, click through flows, screenshot each step, read the screenshots, check the console, and report findings. ~60 seconds for a full QA pass.

**Technical details:**
- Persistent Chromium daemon (Playwright-based)
- First call: ~3 seconds to start browser
- Subsequent calls: ~100-200ms
- Cookies, localStorage, and session state carry over between commands
- Auto-shuts down after 30 minutes idle
- Requires Bun v1.0+

**Security note:** This is a real browser with real state. Cookies persist. Don't point it at sensitive production environments unless you intend to.

---

### /retro

**Mode:** Engineering manager

**What it does:** Analyzes your commit history, work patterns, and shipping velocity. Produces a candid weekly retrospective with real metrics.

**When to use it:**
- End of the week
- When you want to understand your actual shipping patterns vs. what you think they are
- For tracking improvement over time (saves JSON snapshots for trend comparison)

**What it measures:**
- Commits, lines of code, test ratio
- PR sizes and fix ratio
- Coding sessions (detected from commit timestamps)
- Hotspot files
- Shipping streaks
- Biggest ship of the week

**Commands:**
- `/retro` — this week's retrospective
- `/retro compare` — this week vs. last week side by side

**Data:** Saves JSON snapshots to `.context/retros/` in your project for trend tracking.

---

## Auto-Trigger Skills

### Frontend Design

**What it does:** Guides Claude toward distinctive, production-grade UI that avoids generic "AI slop" aesthetics. Bold typography, cohesive color systems, intentional motion, unexpected layouts. The goal is output that looks like a senior designer reviewed it, not like it was generated by default.

**When it triggers:** Automatically — any time you ask Claude Code to build web components, pages, dashboards, React components, HTML/CSS layouts, or any UI work.

**What it enforces:**
- Distinctive typography (no Inter, Roboto, Arial defaults)
- Cohesive color themes with dominant colors and sharp accents
- Motion and micro-interactions that feel intentional
- Unexpected spatial composition — asymmetry, overlap, grid-breaking elements
- Atmospheric backgrounds — gradient meshes, noise textures, grain overlays

---

## Agent Tools

### Autoresearch

**Source:** [karpathy/autoresearch](https://github.com/karpathy/autoresearch) (submodule at `tools/autoresearch/`)

**What it does:** Autonomous AI research agent by Andrej Karpathy. You give it a small but real LLM training setup, point an AI agent at `program.md`, and let it experiment overnight. The agent modifies `train.py`, runs a 5-minute training experiment, checks if val_bpb improved, keeps or discards the change, and repeats. You wake up to a log of experiments and a better model.

**Key concept:** You don't edit Python files. You program `program.md` — a markdown file that instructs the AI agent on research objectives. The agent handles the actual code changes autonomously.

**Requirements:**
- Single NVIDIA GPU (tested on H100)
- Python 3.10+
- [uv](https://docs.astral.sh/uv/) package manager

**Quick start:**

```bash
cd tools/autoresearch

# Install dependencies
uv sync

# One-time data prep (~2 min)
uv run prepare.py

# Manual baseline run (~5 min)
uv run train.py

# Then point Claude/Codex at program.md and let it go
```

**Project structure:**
- `prepare.py` — constants, data prep, runtime utilities (do not modify)
- `train.py` — model, optimizer, training loop (agent modifies this)
- `program.md` — agent instructions (human modifies this)

**Design:** Fixed 5-minute time budget per experiment (~12 experiments/hour, ~100 overnight). Single metric: val_bpb (lower is better). One GPU, one file, one metric.

---

## Recommended Workflow

For any non-trivial feature, the full pipeline is:

```
1. /plan-ceo-review    → Am I building the right thing?
2. /plan-eng-review    → How do I build it right?
3. Implement           → Write the code
4. /review             → What can still break?
5. /code-review        → Multi-agent structural audit
6. /ship               → Land the branch
7. /browse             → Verify it works in the real browser
8. /retro              → What did I actually ship this week?
```

Not every task needs every step. A quick bug fix might skip straight to implement → `/review` → `/ship`. A major feature should run the full pipeline.

---

## Installation

All tools are installed locally to `~/.claude/` on your machine. See the setup commands below if you need to reinstall.

**MCP Servers:**
```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory
```

**Plugins (run inside Claude Code):**
```
/plugin add anthropics/claude-code --plugin ralph-wiggum
/plugin add anthropics/claude-code --plugin code-review
```

**gstack (paste as prompt in Claude Code):**
> Install gstack: run `git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup` then add a "gstack" section to CLAUDE.md.

**Prerequisites:**
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
- Node.js / npm
- Git
- [Bun](https://bun.sh/) v1.0+ (for `/browse` only)

---

## License

MIT
