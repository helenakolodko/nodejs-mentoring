import express from 'express';
import UserService from '../services/users';
import userSchema from '../validation/userSchema';
import loginExistsValidation from '../validation/loginExistsValidation';

const validator = require('express-joi-validation').createValidator({});
const router: express.Router = express.Router();

router.get('/', (req, res) => res.json(UserService.all()));

router.get('/:id', (req, res) => {
    const user = UserService.getById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

router.get('/auto-suggest/:loginSubstring', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
    console.log(req.query.limit, req.params.loginSubstring);
    res.json(UserService.getAutoSuggestUsers(req.params.loginSubstring.toString(), limit));
});

router.post('/',
    validator.body(userSchema),
    loginExistsValidation(),
    (req, res) => {
        console.log(req.body);
        UserService.newUser(req.body);
        res.sendStatus(200);
    }
);

router.put('/:id',
    validator.body(userSchema),
    (req, res) => {
        const user = UserService.getById(req.params.id);
        if (user) {
            UserService.update(req.body);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
);

router.delete('/:id', (req, res) => {
    const user = UserService.getById(req.params.id);
    if (user) {
        UserService.softDelete(user);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;
