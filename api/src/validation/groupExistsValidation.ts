import { Request, Response, NextFunction } from 'express';
import {GroupService} from '../entities/group/group.service';

const groupExistsValidation = (groupService: GroupService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const logins = await groupService.allGroupNames();

        if (logins.includes(req.body.login)) {
            res.status(400)
                .json(`Group with name '${req.body.login}' already exists.`);
        } else {
            return next();
        }
    };
};

export default groupExistsValidation;
