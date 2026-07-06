# AI Dev Agent v2

Telegram controlled AI development agent powered by Antigravity CLI.

## Commands

```text
/start
/help
/health
/agy Say hello in Bangla
```

## Zeabur Environment Variables

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ALLOWED_TELEGRAM_USER_IDS=your_telegram_user_id
PORT=3000
WORKSPACE_DIR=/workspace
AGY_BIN=/data/.local/bin/agy
AGY_TIMEOUT_MS=120000
```

## Deploy

1. Upload this project to GitHub.
2. Connect repo to Zeabur.
3. Add environment variables.
4. Redeploy.
5. Test in Telegram:

```text
/agy Say hello in Bangla
```

## Why this fixes hanging

This version uses `execFile()` with:

- absolute Antigravity path
- fixed PATH
- non-interactive environment
- timeout protection
- workspace directory creation
- stdout/stderr capture

So if Antigravity hangs or fails, Telegram will return a readable error instead of waiting forever.
