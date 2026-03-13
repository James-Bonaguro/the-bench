# Firecrawl CLI

Installed globally via npm: `firecrawl-cli@1.10.0`

## Install

```bash
npm install -g firecrawl-cli
```

## Auth

```bash
firecrawl login --api-key fc-YOUR_API_KEY
# or
export FIRECRAWL_API_KEY=fc-YOUR_API_KEY
```

## Usage

```bash
# Scrape a URL to markdown
firecrawl scrape https://example.com

# Search the web
firecrawl search "private credit AI tools"

# Crawl an entire site
firecrawl crawl https://example.com

# Map all URLs on a domain
firecrawl map https://example.com

# AI agent for complex extraction
firecrawl agent "find pricing info on example.com"

# Check status and credits
firecrawl --status
```

## Skills installed

8 Firecrawl skills installed to `~/.agents/skills/` — available to Claude Code and 40+ other agents.

## Docs

https://docs.firecrawl.dev/sdks/cli
