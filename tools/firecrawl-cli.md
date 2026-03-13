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

## Basic usage

```bash
# Scrape a URL (markdown output)
firecrawl https://example.com

# Clean main content only
firecrawl https://example.com --only-main-content
```

## Docs

https://docs.firecrawl.dev/sdks/cli
