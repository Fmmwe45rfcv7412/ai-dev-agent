import { runAgy } from '../providers/antigravity.js';
import { runShell } from './shell.js';
import { truncate } from '../utils/helpers.js';

export async function handleCommand(text) {
  const input = (text || '').trim();

  if (input === '/start' || input === '/help') {
    return [
      'AI Dev Agent v2 is running.',
      '',
      'Commands:',
      '/health - check bot status',
      '/agy your prompt - ask Antigravity CLI',
      '/shell command - optional shell command',
      '',
      'Example:',
      '/agy Say hello in Bangla',
    ].join('\n');
  }

  if (input === '/health') {
    return '✅ Bot running. Use /agy Say hello in Bangla';
  }

  if (input.startsWith('/agy')) {
    const prompt = input.replace(/^\/agy\s*/i, '').trim();
    const result = await runAgy(prompt);
    return truncate(result.output || 'No output returned.');
  }

  if (input.startsWith('/shell')) {
    const command = input.replace(/^\/shell\s*/i, '').trim();
    const result = await runShell(command);
    return truncate(result.output || 'No output returned.');
  }

  return 'Unknown command. Use /help or /agy your prompt';
}
