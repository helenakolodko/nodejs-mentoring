import express from 'express';
import type { User } from '../types/user';
import userSchema from '../validation/userSchema';
import loginExistsValidation from '../validation/loginExistsValidation';

const validator = require('express-joi-validation').createValidator({});
const router: express.Router = express.Router();
const users: Map<string, User> = new Map();

router.get('/', (req, res) => res.json(Array.from(users.values())));

router.get('/:id', (req, res) => {
    const user = users.get(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

router.get('/auto-suggest/:loginSubstring', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
    const filtered = Array.from(users.values())
        .filter(({ login }) => login?.includes(req.params.loginSubstring.toString()))
        .slice(0, limit);
    res.json(filtered);
});

router.post('/',
    validator.body(userSchema),
    loginExistsValidation(users),
    (req, res) => {
        console.log(req.body);
        users.set(req.body.id, req.body);
        res.sendStatus(200);
    }
);

router.put('/:id',
    validator.body(userSchema),
    (req, res) => {
        const user = users.get(req.params.id);
        if (user) {
            users.set(req.params.id, req.body);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
);

router.delete('/:id', (req, res) => {
    const user = users.get(req.params.id);
    if (user) {
        users.set(req.params.id, { ...user, isDeleted: true });
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;
