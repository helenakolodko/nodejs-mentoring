import { GroupService } from './group.service';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupInterface } from './group.interface';

export class GroupController {
    groupService: GroupService;

    constructor(groupService: GroupService) {
        this.groupService = groupService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const groups = await this.groupService.all();
            res.json(groups);
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to get groups`, error);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                res.json(group);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to get group with id '${id}'`, error);
        }
    }

    createGroup = async (req: Request, res: Response) => {
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
            res.sendStatus(500);
            console.error(`Failed to create group`, req.body, error);
        }
    }

    updateGroup = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const group = await this.groupService.getById(id);
            if (group) {
                await this.groupService.update(req.body);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to update group`, req.body, error);
        }
    }

    addUsers = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userIds } = req.body;
        console.log('add users get');
        try {

            const group = await this.groupService.getById(id);
            if (group) {
                console.log('add users add');
                await this.groupService.addUsers(id, userIds);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(500);
            console.error(`Failed to add users to group ${id}`, req.body, error);
        }
    }

    deleteGroup = async (req: Request, res: Response) => {
        const { id } = req.params
        const group = await this.groupService.getById(id);
        if (group) {
            await this.groupService.hardDelete(group);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}
