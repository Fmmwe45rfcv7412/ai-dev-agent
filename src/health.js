import express from 'express';
import { config } from './config.js';
import { checkAgyBinary } from '../providers/antigravity.js';
import { logger } from '../utils/logger.js';

export function startHealthServer() {
  const app = express();

  app.get('/', (_req, res) => {
    res.json({
      ok: true,
      name: 'AI Dev Agent v2',
      status: 'running',
    });
  });

  app.get('/health', async (_req, res) => {
    let agy = false;
    try {
      agy = await checkAgyBinary();
    } catch {
      agy = false;
    }

    res.json({
      ok: true,
      status: 'running',
      antigravity: agy ? 'available' : 'missing',
      agyBin: config.agyBin,
    });
  });

  app.listen(config.port, () => {
    logger.info('health_server_started', { port: config.port });
  });
}
