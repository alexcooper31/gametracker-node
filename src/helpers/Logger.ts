import { TransformableInfo } from 'logform';
import {
  createLogger,
  format,
  transports,
} from 'winston';

const {
  colorize,
  combine,
  timestamp,
  printf,
  json,
} = format;

const enumerateErrorFormat = format((info: TransformableInfo) => {
  if ((info.message as any) instanceof Error) {
    info.message = Object.assign({
      message: (info.message as any).message,
      stack: (info.message as any).stack,
    }, info.message);
  }

  if (info instanceof Error) {
    return Object.assign({
      message: info.message,
      stack: info.stack,
    }, info);
  }

  return info;
});

export const Logger = createLogger({
  format: combine(
    enumerateErrorFormat(),
    json(),
    colorize(),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    printf((l) =>
      `[${l.level} - ${l.timestamp}] ${(l.message as any) instanceof Object ? JSON.stringify(l.message) : l.message}`,
    ),
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default Logger;
