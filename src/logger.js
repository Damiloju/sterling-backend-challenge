const winston = require('winston');
const winstonOptions = require('./config/winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File(winstonOptions.file),
    new winston.transports.File(winstonOptions.errorLogsFile),
    new winston.transports.Console(winstonOptions.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.debug(message.replace(/\n$/, ''));
  },
};
