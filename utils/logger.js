function log(level, event, data = {}) {
  const payload = {
    level,
    event,
    time: new Date().toISOString(),
    ...data,
  };
  console.log(JSON.stringify(payload));
}

export const logger = {
  info(event, data) {
    log('info', event, data);
  },
  error(event, data) {
    log('error', event, data);
  },
  warn(event, data) {
    log('warn', event, data);
  },
};
