import express from 'express';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import userRouter from './entities/user/user.routes';
import groupRouter from './entities/group/group.routes';
import dotenv from 'dotenv';
import { Connection } from './db/postgresConnection';

dotenv.config();

const app: express.Application = express();

//Connection.sync();
app.listen(process.env.APP_PORT, () => {
    console.log('App listening on port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((err: any | ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && err.type in ContainerTypes) {
        const e: ExpressJoiError = err;
        res.status(400).end(`You submitted a bad ${e.type} paramater`);
    } else {
        next(err);
    }
});
