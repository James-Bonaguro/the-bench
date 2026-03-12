List all available slash commands in this project along with a brief description of each.

## Instructions

1. Read the `.claude/commands/` directory to find all available commands (`.md` files and symlinks).
2. For each command file found, read its contents to extract a one-line summary of what it does.
3. Also list available built-in skills from the system reminder if visible.
4. Output a neatly formatted help message like this:

```
# Available Commands

## Project Commands
/command-name   - Brief description of what it does

## Tips
- Run any command by typing /<command-name>
- Commands are defined in .claude/commands/
```

Keep descriptions concise (one line each). If a command file has no clear description, summarize its purpose from its content.
