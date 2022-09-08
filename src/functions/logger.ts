import { createLogger, format, transports } from 'winston';
import { config } from 'dotenv';

config();

const { combine, timestamp, label, printf } = format;

// function to create a custom logger
const makeLogger = (tag: string) => {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    const data = {
      timestamp,
      label,
      level,
      message,
    };
    return JSON.stringify(data);
  });

  const logger = createLogger({
    format: combine(label({ label: tag }), timestamp(), myFormat),
    silent: process.env.NODE_ENV === 'test',
    transports: [new transports.Console()],
  });

  return logger;
};

export { makeLogger };
