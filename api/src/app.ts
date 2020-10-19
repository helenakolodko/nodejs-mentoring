import express from 'express';
import cors from 'cors';
import userRouter from './entities/user/user.routes';
import authRouter from './entities/user/auth.routes';
import groupRouter from './entities/group/group.routes';
import dotenv from 'dotenv';
import { Connection } from './db/connections';
import { logger } from './logging/logger';
import { errorLog } from './middlewares/errorLog';
import { methodCallsLog } from './middlewares/methodCallsLog';
import { verifyAccessToken } from './middlewares/jwt';

dotenv.config();

process
    .on('uncaughtException', err => {
        logger.error(err);
    })
    .on('unhandledRejection', err => {
        logger.error(err);
    });

const app: express.Application = express();

app.use(cors());
app.options('*', cors());

Connection
    .sync()
    .then(() => {
        app.listen(process.env.APP_PORT, () => {
            logger.info(`App listening on port ${process.env.APP_PORT}`);
        });
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodCallsLog,);

app.use('/auth', authRouter);

app.use(verifyAccessToken);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use(errorLog);
