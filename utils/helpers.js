export function truncate(text, max = 3900) {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max - 80)}\n\n...output truncated...`;
}

export function cleanOutput(stdout = '', stderr = '') {
  const out = stdout.trim();
  const err = stderr.trim();
  if (out && err) return `${out}\n\nSTDERR:\n${err}`;
  return out || err || 'No output returned.';
}
