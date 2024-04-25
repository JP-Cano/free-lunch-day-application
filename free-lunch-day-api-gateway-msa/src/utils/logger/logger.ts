import { createLogger, format, transports } from 'winston';
import { SERVICE_NAME } from '../constants/constants';

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(
          ({ timestamp, level, message, service }) =>
              `[${timestamp}] ${service} ${level}: ${message}`
      )
  ),
  defaultMeta: {
    service: SERVICE_NAME,
  },
});