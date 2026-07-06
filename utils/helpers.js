export function cleanOutput(stdout = '', stderr = '') {
  return [stdout, stderr]
    .filter(Boolean)
    .join('\n')
    .replace(/\u001b\[[0-9;]*m/g, '')
    .trim();
}
