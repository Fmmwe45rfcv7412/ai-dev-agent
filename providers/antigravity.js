import { execFile } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { config } from '../src/config.js';

export function runAgy(prompt, options = {}) {
  const cwd = options.cwd || config.workspaceDir;
  const timeout = options.timeout || config.agyTimeoutMs;

  if (!existsSync(cwd)) mkdirSync(cwd, { recursive: true });

  return new Promise((resolve) => {
    const env = {
      ...process.env,
      HOME: process.env.HOME || '/root',
      PATH: `/data/.local/bin:/root/.local/bin:${process.env.PATH || ''}`,
      CI: '1',
      NO_COLOR: '1',
      TERM: 'xterm'
    };

    const child = execFile(
      config.agyBin,
      ['-p', prompt],
      {
        cwd,
        env,
        timeout,
        maxBuffer: 1024 * 1024 * 8,
        windowsHide: true
      },
      (err, stdout = '', stderr = '') => {
        const cleanOut = stdout.trim();
        const cleanErr = stderr.trim();

        if (err) {
          resolve({
            ok: false,
            output: cleanOut || cleanErr || err.message,
            error: err.message,
            code: err.code || null,
            signal: err.signal || null
          });
          return;
        }

        resolve({
          ok: true,
          output: cleanOut || cleanErr || 'Done.',
          error: null,
          code: 0,
          signal: null
        });
      }
    );

    child.stdin?.end();
  });
}
