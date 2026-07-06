import { validateConfig } from './config.js';
import { startHealthServer } from './health.js';
import { startTelegramBot } from './telegram.js';
import { logger } from '../utils/logger.js';

process.on('unhandledRejection', (reason) => {
  logger.error('unhandled_rejection', { reason: String(reason) });
});

process.on('uncaughtException', (error) => {
  logger.error('uncaught_exception', { message: error.message, stack: error.stack });
  process.exit(1);
});

try {
  validateConfig();
  startHealthServer();
  startTelegramBot();
  logger.info('ai_dev_agent_started', { version: '2.0.1' });
} catch (error) {
  logger.error('startup_failed', { message: error.message });
  process.exit(1);
}
