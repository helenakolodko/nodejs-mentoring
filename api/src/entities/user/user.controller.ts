import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { UserInterface } from './user.interface';

export class UserController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.all();
            res.json(users);
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to get users`, error);
        }
    }

    getById = async (req: Request, res: Response) => {
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
            res.sendStatus(500);
            console.error(`Failed to get user with id '${id}'`, error);
        }
    }

    getAutoSuggestUsers = async (req: Request, res: Response) => {
        const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
        const loginSubstring = req.params.loginSubstring;
        try {
            const users = await this.userService.getAutoSuggestUsers(loginSubstring, limit);
            res.json(users);
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to get users by login substring '${loginSubstring}'`, error);
        }
    }

    createUser = async (req: Request, res: Response) => {
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
            res.sendStatus(500);
            console.error(`Failed to create user`, req.body, error);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const user = await this.userService.getById(id);
            if (user) {
                await this.userService.update(req.body);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to update user`, req.body, error);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params
        const user = await this.userService.getById(id);
        if (user) {
            await this.userService.softDelete(user);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}
