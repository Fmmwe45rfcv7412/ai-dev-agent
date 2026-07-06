import TelegramBot from 'node-telegram-bot-api';
import { config } from './config.js';
import { handleTelegramCommand } from './router.js';
import { error, log } from '../utils/logger.js';

function isAllowed(userId) {
  if (!config.allowedTelegramUserIds.length) return true;
  return config.allowedTelegramUserIds.includes(String(userId));
}

function chunkMessage(text, size = 3900) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
  return chunks;
}

export function startTelegram() {
  if (!config.telegramToken) {
    log('Telegram bot disabled: TELEGRAM_BOT_TOKEN not found');
    return null;
  }

  const bot = new TelegramBot(config.telegramToken, { polling: true });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    const text = msg.text || '';

    if (!isAllowed(userId)) {
      await bot.sendMessage(chatId, '⛔ You are not allowed to use this bot.');
      return;
    }

    try {
      log('Telegram message received', { userId, text });
      const loading = await bot.sendMessage(chatId, '⏳ Antigravity কাজ করছে...');
      const reply = await handleTelegramCommand(text);

      await bot.deleteMessage(chatId, loading.message_id).catch(() => {});
      for (const part of chunkMessage(reply)) {
        await bot.sendMessage(chatId, part);
      }
    } catch (err) {
      error('Telegram handler error', err);
      await bot.sendMessage(chatId, `❌ Error: ${err.message}`);
    }
  });

  bot.on('polling_error', (err) => error('Telegram polling error', err.message));
  log('Telegram bot started');
  return bot;
}
