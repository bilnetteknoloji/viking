import winston from 'winston';
import path from 'path';

export const setupLogger = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: 'daily-tour-ticket-app' },
    transports: [
      new winston.transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }));
  }

  global.logger = logger;
};

declare global {
  namespace NodeJS {
    interface Global {
      logger: winston.Logger;
    }
  }
} 