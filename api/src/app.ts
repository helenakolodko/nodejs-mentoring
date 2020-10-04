import express from 'express';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import userRouter from './entities/user/user.routes';
import groupRouter from './entities/group/group.routes';
import dotenv from 'dotenv';
import { Connection } from './db/connections';
import { logger } from './logging/logger';
import { errorLog } from './middlewares/errorLog';
import { methodCallsLog } from './middlewares/methodCallsLog';

dotenv.config();

process.on('uncaughtException', (err) =>  {
    logger.error(err);
    process.exit(1);
});
process.on('unhandledRejection', err => {
    logger.error(err);
});

const app: express.Application = express();

Connection.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('App listening on port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodCallsLog,);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use(errorLog);
