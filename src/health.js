import express from 'express';
import { config } from './config.js';
import { checkAgyBinary } from '../providers/antigravity.js';
import { logger } from '../utils/logger.js';

export function startHealthServer() {
  const app = express();

  app.get('/', (_req, res) => {
    res.json({ ok: true, service: 'ai-dev-agent', version: '2.0.0' });
  });

  app.get('/health', async (_req, res) => {
    let agyReady = false;
    try {
      agyReady = await checkAgyBinary();
    } catch {
      agyReady = false;
    }

    res.json({
      ok: true,
      service: 'ai-dev-agent',
      version: '2.0.0',
      nodeEnv: config.nodeEnv,
      agyBin: config.agyBin,
      agyCwd: config.agyCwd,
      agyReady,
      uptime: process.uptime(),
    });
  });

  app.listen(config.port, () => {
    logger.info('health_server_started', { port: config.port });
  });
}
