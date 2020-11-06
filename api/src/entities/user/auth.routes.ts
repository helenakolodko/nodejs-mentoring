import express from 'express';
import { authSchema } from '../../validation/authSchema';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';

const userService = new UserService();
const controller = new AuthController(userService);
const validator = require('express-joi-validation').createValidator({});

const router: express.Router = express.Router();

router.post('/login',
    validator.body(authSchema), 
    controller.login);

export default router;
