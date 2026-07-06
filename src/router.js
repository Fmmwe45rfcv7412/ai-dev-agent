import { runAgy } from '../providers/antigravity.js';

export async function handleTelegramCommand(text) {
  const trimmed = (text || '').trim();

  if (trimmed === '/start') {
    return '✅ AI Dev Agent v2 running.\n\nUse: /agy your task';
  }

  if (trimmed === '/help') {
    return [
      'Commands:',
      '/agy <task> - Run Antigravity CLI',
      '/health - Check bot health',
      '/help - Show help'
    ].join('\n');
  }

  if (trimmed === '/health') {
    return '✅ Bot OK. Antigravity command path configured.';
  }

  if (trimmed.startsWith('/agy')) {
    const prompt = trimmed.replace(/^\/agy(@\w+)?\s*/i, '').trim();
    if (!prompt) return 'Please write a task after /agy. Example: /agy Say hello in Bangla';

    const result = await runAgy(prompt);
    if (!result.ok) {
      return `❌ Antigravity failed\n\n${result.output}`;
    }
    return result.output;
  }

  return 'Unknown command. Use /help';
}
