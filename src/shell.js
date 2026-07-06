import { exec } from 'node:child_process';
import { config } from './config.js';
import { cleanOutput } from '../utils/helpers.js';

export function runShell(command) {
  return new Promise((resolve) => {
    if (!command) {
      resolve('Please provide a shell command.');
      return;
    }

    exec(command, {
      cwd: config.agyCwd,
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 2,
      env: process.env,
    }, (error, stdout, stderr) => {
      const output = cleanOutput(stdout, stderr);
      if (error) {
        resolve(`Shell error: ${error.message}\n\n${output}`.trim());
        return;
      }
      resolve(output || 'No output returned.');
    });
  });
}
