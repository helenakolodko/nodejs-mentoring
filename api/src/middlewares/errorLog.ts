import { Request, Response, NextFunction } from 'express';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import { logger } from '../logging/logger';

export const errorLog = (err: any | ExpressJoiError, req: Request, res: Response, next: NextFunction) => {    
    logger.error(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}\n${err}`);

    if (err && err.type && err.type in ContainerTypes) {
        const e: ExpressJoiError = err;
        res.status(400).end(`You submitted a bad ${e.type} paramater`);
    }
    else{
        res.status(err.status).json({ error: { message: err.message } });
    }    
    next();
};
