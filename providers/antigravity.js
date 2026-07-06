import { execFile } from 'node:child_process';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { config } from '../src/config.js';
import { cleanOutput } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function checkAgyBinary() {
  await access(config.agyBin, constants.X_OK);
  return true;
}

export function runAgy(prompt) {
  return new Promise((resolve) => {
    const startedAt = Date.now();

    if (!prompt || !prompt.trim()) {
      resolve({ ok: false, output: 'Please provide a prompt after /agy.' });
      return;
    }

    logger.info('agy_start', {
      cwd: config.agyCwd,
      bin: config.agyBin,
      promptLength: prompt.length,
    });

    const child = execFile(
      config.agyBin,
      ['-p', prompt],
      {
        cwd: config.agyCwd,
        timeout: config.agyTimeoutMs,
        maxBuffer: 1024 * 1024 * 10,
        env: {
          ...process.env,
          CI: '1',
          NO_COLOR: '1',
          TERM: 'dumb',
          HOME: process.env.HOME || '/root',
          PATH: process.env.PATH || '/data/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
        },
      },
      (error, stdout, stderr) => {
        const durationMs = Date.now() - startedAt;
        const output = cleanOutput(stdout, stderr);

        if (error) {
          logger.error('agy_failed', {
            durationMs,
            code: error.code,
            signal: error.signal,
            message: error.message,
          });

          const timeoutMessage = error.killed
            ? `Antigravity timed out after ${Math.round(config.agyTimeoutMs / 1000)} seconds.`
            : error.message;

          resolve({
            ok: false,
            output: `${timeoutMessage}\n\n${output}`.trim(),
          });
          return;
        }

        logger.info('agy_done', { durationMs });
        resolve({ ok: true, output });
      },
    );

    child.stdin?.end();
  });
}
