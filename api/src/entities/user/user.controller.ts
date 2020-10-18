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
        try {
            const users = await this.userService.all();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const user = await this.userService.getById(id);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            next(error);
        }
    }

    getAutoSuggestUsers = async (req: Request, res: Response, next: NextFunction) => {
        const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
        const loginSubstring = req.params.loginSubstring;
        try {
            const users = await this.userService.getAutoSuggestUsers(loginSubstring, limit);
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: UserInterface = {
                id: uuid(),
                ...req.body,
                isDeleted: false
            }
            await this.userService.newUser(user);
            res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const user = await this.userService.getById(id);
            if (user) {
                const userUpdated: UserInterface = {
                    ...req.body,
                    id: id
                }
                await this.userService.update(userUpdated);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            next(error);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const user = await this.userService.getById(id);
            if (user) {
                await this.userService.softDelete(user);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            next(error);
        }
    }
}
