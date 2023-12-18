const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const fs = require('fs');

const date = new Date();
const logDir = `logs/${date.toLocaleString()}`;

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${logDir}/logfile.log`
    })
  ]
});

logger.info({
  level: 'info',
  message: 'What time is the testing at?'
});

module.exports = logger;
