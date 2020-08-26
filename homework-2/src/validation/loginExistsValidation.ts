import { Request, Response, NextFunction } from 'express';
import type { User } from '../types/user';

const loginExistsValidation = (users: Map<string, User>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const logins = Array.from(users.values()).map(({ login }) => login);

        if (logins.includes(req.body.login)) {
            res.status(400)
                .json(`User with this login '${req.body.login}' already exists.`);
        } else {
            return next();
        }
    };
};

export default loginExistsValidation;
