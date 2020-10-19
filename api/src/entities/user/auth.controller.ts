import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { signAccessToken } from '../../middlewares/jwt';

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
                res.status(403).end(`Invalid token`);
            }
        } catch (error) {
            return next(error);
        }
    };
}