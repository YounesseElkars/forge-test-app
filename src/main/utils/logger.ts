const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Colorizes the output
      translateTime: 'SYS:standard', // Translates timestamps to readable format
      ignore: 'pid,hostname', // Skips pid and hostname in the output
      singleLine: true, // Outputs each log on a single line
    },
  },
});

export default logger;
