import 'dotenv/config';

function numberEnv(name, fallback) {
  const raw = process.env[name];
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function listEnv(name) {
  return (process.env[name] || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export const config = {
  port: numberEnv('PORT', 3000),
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
  allowedTelegramUserIds: listEnv('ALLOWED_TELEGRAM_USER_IDS'),
  workspaceDir: process.env.WORKSPACE_DIR || '/workspace',
  agyBin: process.env.AGY_BIN || '/data/.local/bin/agy',
  agyTimeoutMs: numberEnv('AGY_TIMEOUT_MS', 120000),
  discordToken: process.env.DISCORD_BOT_TOKEN || ''
};
