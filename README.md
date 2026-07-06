# AI Dev Agent v2

Telegram controlled AI development agent powered by Antigravity CLI.

## Commands

- `/start` - show help
- `/health` - bot health
- `/agy your prompt` - run Antigravity CLI
- `/shell command` - optional shell command, disabled by default

## Zeabur environment variables

```env
TELEGRAM_BOT_TOKEN=your_bot_token
ALLOWED_TELEGRAM_USER_IDS=your_telegram_user_id
AGY_BIN=/data/.local/bin/agy
AGY_CWD=/workspace
AGY_TIMEOUT_MS=120000
PORT=3000
NODE_ENV=production
ENABLE_SHELL=false
```

## Telegram test

```text
/health
/agy Say hello in Bangla
```

## Notes

If `/agy` hangs, check Zeabur logs and test inside terminal:

```bash
cd /workspace
/data/.local/bin/agy -p "Say hello in Bangla"
```
