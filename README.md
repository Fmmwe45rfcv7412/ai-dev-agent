# AI Dev Agent v2

Telegram controlled AI development agent powered by Antigravity CLI.

## Commands

- `/start` - show help
- `/health` - check bot status
- `/agy your prompt` - ask Antigravity CLI
- `/shell command` - optional shell command, disabled by default

## Zeabur Environment Variables

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ALLOWED_TELEGRAM_USER_IDS=your_numeric_telegram_user_id
AGY_BIN=/data/.local/bin/agy
AGY_CWD=/workspace
AGY_TIMEOUT_MS=120000
PORT=3000
NODE_ENV=production
ENABLE_SHELL=false
```

## Test

```text
/health
/agy Say hello in Bangla
```
