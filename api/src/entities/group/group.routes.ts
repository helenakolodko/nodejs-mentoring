import express from 'express';
import {GroupService} from './group.service';
import {GroupController} from './group.controller';
import groupSchema from '../../validation/groupSchema';
import groupExistsValidation from '../../validation/groupExistsValidation';

const groupService = new GroupService();
const controller = new GroupController(groupService);
const validator = require('express-joi-validation').createValidator({});

const router: express.Router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/',
    validator.body(groupSchema),
    groupExistsValidation(groupService),
    controller.createGroup
);

router.put('/:id',
    validator.body(groupSchema),
    controller.updateGroup
);

router.post('/:id/addUsers/',
    controller.addUsers
);

router.delete('/:id', controller.deleteGroup);

export default router;
