import express from 'express';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { groupCreateSchema, groupUpdateSchema } from '../../validation/groupSchema';
import groupExistsValidation from '../../validation/groupExistsValidation';
import groupUsersSchema from '../../validation/groupUsersSchema';

const groupService = new GroupService();
const controller = new GroupController(groupService);
const validator = require('express-joi-validation').createValidator({});

const router: express.Router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/',
    validator.body(groupCreateSchema),
    groupExistsValidation(groupService),
    controller.createGroup
);

router.put('/:id',
    validator.body(groupUpdateSchema),
    controller.updateGroup
);

router.post('/:id/addUsers/',
    validator.body(groupUsersSchema),
    controller.addUsers
);

router.delete('/:id', controller.deleteGroup);

export default router;
