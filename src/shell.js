import { exec } from 'node:child_process';
import { config } from './config.js';
import { cleanOutput } from '../utils/helpers.js';

export function runShell(command) {
  return new Promise((resolve) => {
    if (!config.enableShell) {
      resolve({ ok: false, output: 'Shell command is disabled. Set ENABLE_SHELL=true to enable it.' });
      return;
    }

    exec(
      command,
      {
        cwd: config.agyCwd,
        timeout: 60000,
        maxBuffer: 1024 * 1024 * 5,
        env: process.env,
      },
      (error, stdout, stderr) => {
        const output = cleanOutput(stdout, stderr);
        if (error) {
          resolve({ ok: false, output: `${error.message}\n\n${output}`.trim() });
          return;
        }
        resolve({ ok: true, output });
      },
    );
  });
}
