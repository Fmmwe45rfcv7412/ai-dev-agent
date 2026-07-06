import { runAgy, checkAgyBinary } from '../providers/antigravity.js';
import { runShell } from './shell.js';
import { config } from './config.js';

const HELP_TEXT = `AI Dev Agent v2 is running.

Commands:
/health - check bot status
/agy your prompt - ask Antigravity CLI
/shell command - optional shell command

Example:
/agy Say hello in Bangla`;

export async function handleCommand(text) {
  const input = text.trim();

  if (input === '/start' || input === '/help') {
    return HELP_TEXT;
  }

  if (input === '/health') {
    let agyStatus = 'missing';
    try {
      await checkAgyBinary();
      agyStatus = 'available';
    } catch {
      agyStatus = 'missing';
    }

    return `✅ Bot running.
Antigravity: ${agyStatus}
AGY_BIN: ${config.agyBin}`;
  }

  if (input.startsWith('/agy')) {
    const prompt = input.replace(/^\/agy(@\w+)?\s*/i, '').trim();
    const result = await runAgy(prompt);
    return result.output || 'No output returned.';
  }

  if (input.startsWith('/shell')) {
    if (!config.enableShell) {
      return 'Shell command is disabled. Set ENABLE_SHELL=true to enable it.';
    }
    const command = input.replace(/^\/shell(@\w+)?\s*/i, '').trim();
    return await runShell(command);
  }

  return HELP_TEXT;
}
