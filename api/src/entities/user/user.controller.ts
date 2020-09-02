import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { UserInterface } from './user.interface';

export class UserController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.all();
        res.json(users);
        return next();
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const user = await this.userService.getById(id);
        if (user) {
            res.json(user);
            return next();
        } else {
            res.sendStatus(404);
        }
    }

    getAutoSuggestUsers = async (req: Request, res: Response, next: NextFunction) => {
        const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
        const users = await this.userService.getAutoSuggestUsers(req.params.loginSubstring.toString(), limit);
        res.json(users);
        return next();
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        const user: UserInterface = {
            ...req.body,
            id: uuid(),
            isDeleted: false
        }
        await this.userService.newUser(user);
        res.sendStatus(200);
        return next();
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const user = await this.userService.getById(id);
        if (user) {
            await this.userService.update(req.body);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
        return next();
    }

    deleteUser = async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const user = await this.userService.getById(id);
        if (user) {
            await this.userService.softDelete(user);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
        return next();
    }
}
