import { Request, Response, NextFunction } from 'express';
import { logger } from '../logging/logger';
import { hrToMiliseconds } from '../utils/timeConvertion';

export const methodCallsLog = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const timePassed = process.hrtime(start);
        logger.debug(`${req.method} ${req.originalUrl} took ${hrToMiliseconds(timePassed)} ms`);
    });
    next();
};
