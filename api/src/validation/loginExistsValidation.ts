import { Request, Response, NextFunction } from 'express';
import { UserService } from '../entities/user/user.service';

const loginExistsValidation = (userService: UserService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const logins = await userService.allLogins();

        if (logins.includes(req.body.login)) {
            res.status(400)
                .json(`User with login '${req.body.login}' already exists.`);
        } else {
            return next();
        }
    };
};

export default loginExistsValidation;
