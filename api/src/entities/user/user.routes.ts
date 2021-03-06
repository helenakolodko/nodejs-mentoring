import express from 'express';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userCreateSchema, userUpdateSchema } from '../../validation/userSchema';
import loginExistsValidation from '../../validation/loginExistsValidation';

const userService = new UserService();
const controller = new UserController(userService);
const validator = require('express-joi-validation').createValidator({});

const router: express.Router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.get('/auto-suggest/:loginSubstring', controller.getAutoSuggestUsers);

router.post('/',
    validator.body(userCreateSchema),
    loginExistsValidation(userService),
    controller.createUser
);

router.put('/:id',
    validator.body(userUpdateSchema),
    controller.updateUser
);

router.delete('/:id', controller.deleteUser);

export default router;
