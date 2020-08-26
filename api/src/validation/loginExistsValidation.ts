import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users';

const loginExistsValidation = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const logins = UserService.allLogins();

        if (logins.includes(req.body.login)) {
            res.status(400)
                .json(`User with this login '${req.body.login}' already exists.`);
        } else {
            return next();
        }
    };
};

export default loginExistsValidation;
