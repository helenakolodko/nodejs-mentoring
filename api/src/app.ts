import express from 'express';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import router from './routers/users';

const app: express.Application = express();

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', router);

app.use((err: any | ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && err.type in ContainerTypes) {
        const e: ExpressJoiError = err;
        res.status(400).end(`You submitted a bad ${e.type} paramater`);
    } else {
        return next(err);
    }
});
