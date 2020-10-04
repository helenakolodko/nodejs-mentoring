import { createLogger, format, Logger, transports } from 'winston';

export const logger: Logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.colorize(),
                format.printf(({ level, timestamp, message }) => `${timestamp} ${level}: ${message}`)
            )
        })
    ]
});
