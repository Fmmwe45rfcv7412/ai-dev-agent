import express from 'express';
import { config } from './config.js';
import { startTelegram } from './telegram.js';
import { log } from '../utils/logger.js';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'AI Dev Agent v2' });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ai-dev-agent',
    telegram: Boolean(config.telegramToken),
    agyBin: config.agyBin,
    workspaceDir: config.workspaceDir
  });
});

app.listen(config.port, () => {
  log(`HTTP server running on port ${config.port}`);
});

startTelegram();

if (!config.discordToken) {
  log('Discord bot disabled: DISCORD_BOT_TOKEN not found');
}
