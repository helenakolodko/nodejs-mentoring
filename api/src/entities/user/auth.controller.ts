import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { signAccessToken } from '../../middlewares/jwt';
import createError from 'http-errors';

export class AuthController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const { login, password } = req.body;
        try {
            const user = await this.userService.getByLoginPassword(login, password);
            if (user) {
                const accessToken = signAccessToken(user.id);
                res.send({ accessToken });
            } else {
                throw createError(403, `Invalid credentials`);
            }
        } catch (error) {
            return next(error);
        }
    };
}