import dotenv from 'dotenv';

dotenv.config();

function intFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function boolFromEnv(name, fallback = false) {
  const raw = process.env[name];
  if (!raw) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
}

function parseAllowedUsers(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: intFromEnv('PORT', 3000),
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  allowedTelegramUserIds: parseAllowedUsers(process.env.ALLOWED_TELEGRAM_USER_IDS),
  agyBin: process.env.AGY_BIN || '/data/.local/bin/agy',
  agyCwd: process.env.AGY_CWD || '/workspace',
  agyTimeoutMs: intFromEnv('AGY_TIMEOUT_MS', 120000),
  enableShell: boolFromEnv('ENABLE_SHELL', false),
};

export function validateConfig() {
  const missing = [];
  if (!config.telegramBotToken) missing.push('TELEGRAM_BOT_TOKEN');
  if (config.allowedTelegramUserIds.length === 0) missing.push('ALLOWED_TELEGRAM_USER_IDS');

  if (missing.length > 0) {
    throw new Error(`Missing required env variables: ${missing.join(', ')}`);
  }
}
