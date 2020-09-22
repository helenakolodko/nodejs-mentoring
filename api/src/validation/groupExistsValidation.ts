import { Request, Response, NextFunction } from 'express';
import {GroupService} from '../entities/group/group.service';

const groupExistsValidation = (groupService: GroupService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const names = await groupService.allGroupNames();

        if (names.includes(req.body.name)) {
            res.status(400)
                .json(`Group with name '${req.body.name}' already exists.`);
        } else {
            return next();
        }
    };
};

export default groupExistsValidation;
