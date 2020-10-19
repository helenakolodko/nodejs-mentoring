import { GroupService } from './group.service';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupInterface } from './group.interface';
import createError from 'http-errors';

export class GroupController {
    groupService: GroupService;

    constructor(groupService: GroupService) {
        this.groupService = groupService;
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groups = await this.groupService.all();
            res.json(groups);
        }
        catch (error) {
            next(createError(500, `Failed to get groups\n${error}`));
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                res.json(group);
            } else {
                throw createError(404);
            }
        }
        catch (error) {
            next(error);
        }
    }

    createGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group: GroupInterface = {
                id: uuid(),
                ...req.body,
                isDeleted: false
            }
            await this.groupService.newGroup(group);
            res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }

    updateGroup = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                const groupUpdated: GroupInterface = {
                    ...req.body,
                    id: id
                }
                await this.groupService.update(groupUpdated);
                res.sendStatus(200);
            } else {
                throw createError(404);
            }
        }
        catch (error) {
            next(error);
        }
    }

    addUsers = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { userIds } = req.body;
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                await this.groupService.addUsers(id, userIds);
                res.sendStatus(200);
            } else {
                throw createError(404);
            }
        }
        catch (error) {
            next(error);
        }
    }

    deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                await this.groupService.hardDelete(group);
                res.sendStatus(200);
            } else {
                throw createError(404);
            }
        }
        catch (error) {
            next(error);
        }
    }
}
