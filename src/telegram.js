import TelegramBot from 'node-telegram-bot-api';
import { config } from './config.js';
import { handleCommand } from './router.js';
import { logger } from '../utils/logger.js';

function isAllowedUser(msg) {
  const userId = String(msg.from?.id || '');
  return config.allowedTelegramUserIds.includes(userId);
}

async function safeSend(bot, chatId, text, options = {}) {
  const chunks = String(text || 'No output returned.').match(/[\s\S]{1,3900}/g) || ['No output returned.'];
  for (const chunk of chunks) {
    await bot.sendMessage(chatId, chunk, options);
  }
}

export function startTelegramBot() {
  const bot = new TelegramBot(config.telegramBotToken, { polling: true });

  bot.on('polling_error', (error) => {
    logger.error('telegram_polling_error', { message: error.message });
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || '';

    logger.info('telegram_message_received', {
      chatId,
      userId: msg.from?.id,
      textLength: text.length,
    });

    if (!isAllowedUser(msg)) {
      await safeSend(bot, chatId, '⛔ You are not allowed to use this bot.');
      return;
    }

    if (!text.trim()) {
      await safeSend(bot, chatId, 'Please send a text command.');
      return;
    }

    let workingMessage = null;
    if (text.startsWith('/agy')) {
      workingMessage = await bot.sendMessage(chatId, '⏳ Antigravity কাজ করছে...');
    }

    try {
      const response = await handleCommand(text);
      if (workingMessage && response.length <= 3900) {
        await bot.editMessageText(response, {
          chat_id: chatId,
          message_id: workingMessage.message_id,
        });
      } else {
        if (workingMessage) {
          await bot.editMessageText('✅ Done. Sending output...', {
            chat_id: chatId,
            message_id: workingMessage.message_id,
          });
        }
        await safeSend(bot, chatId, response);
      }
    } catch (error) {
      logger.error('telegram_handler_failed', { message: error.message });
      const errorText = `❌ Error: ${error.message}`;
      if (workingMessage) {
        await bot.editMessageText(errorText, {
          chat_id: chatId,
          message_id: workingMessage.message_id,
        });
      } else {
        await safeSend(bot, chatId, errorText);
      }
    }
  });

  logger.info('telegram_bot_started');
  return bot;
}
