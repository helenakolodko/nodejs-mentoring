import { v4 as uuidv4 } from "uuid";
import createError from 'http-errors';
import { UserService } from '../entities/user/user.service';
import { UserController } from '../entities/user/user.controller';
import { GroupInterface } from "../entities/group/group.interface";
import { UserInterface } from "../entities/user/user.interface";

const notFoundError = createError(404);
const req: any = {
    body: {
        login: 'test',
        password: 'test324t',
        age: 34
    },
    params: { id: uuidv4() },
    query: {}
};

const res: any = {
    send: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};

const next = jest.fn();

const userService = new UserService();
const userController = new UserController(userService);

describe("UserController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getById", () => {
        it('should return user by id', async () => {
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve({ id } as any));

            await userController.getById(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ id: req.params.id });
            expect(res.json).toHaveBeenCalledTimes(1);
        })

        it('should return 404 if user doesn\'t exist', async () => {
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve(null));

            await userController.getById(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(res.json).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })
    });

    describe("updateUser", () => {
        it('should return 404 if user doesn\'t exist', async () => {
            const user = { id: req.params.id, ...req.body } as UserInterface;
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve(null));

            jest.spyOn(userService, "update").mockImplementation((user) => Promise.resolve());

            await userController.updateUser(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(userService.update).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })

        it('should update user by id', async () => {
            const user = { id: req.params.id, ...req.body } as UserInterface;
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve(user));

            jest.spyOn(userService, "update").mockImplementation((user) => Promise.resolve());

            await userController.updateUser(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(userService.update).toBeCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(200);
        })
    });

    describe("createUser", () => {
        it('should create user', async () => {
            const user = { ...req.body } as UserInterface;
            jest.spyOn(userService, "newUser").mockImplementation((user) => Promise.resolve());

            await userController.createUser(req, res, next);

            expect(userService.newUser).toBeCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(200);
        })
    });

    describe("deleteUser", () => {
        it('should delete user by id', async () => {
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve({ id: req.params.id, ...req.body } as UserInterface));
            jest.spyOn(userService, "softDelete").mockImplementation((id) => Promise.resolve());

            await userController.deleteUser(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(userService.softDelete).toBeCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(200);
        })

        it('should return 404 if user doesn\'t exist', async () => {
            const user = { id: req.params.id, ...req.body } as UserInterface;
            jest.spyOn(userService, "getById").mockImplementation((id) => Promise.resolve(null));

            jest.spyOn(userService, "softDelete").mockImplementation((user) => Promise.resolve());

            await userController.deleteUser(req, res, next);

            expect(userService.getById).toBeCalledTimes(1);
            expect(userService.update).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })
    });

    describe("getAll", () => {
        it('should get list of all users', async () => {
            const users = [{ id: req.params.id, ...req.body } as UserInterface];
            jest.spyOn(userService, "all").mockImplementation(() => Promise.resolve(users));

            await userController.getAll(req, res, next);

            expect(userService.all).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(users);
        })

        it('should return empty list if no users  exist', async () => {
            jest.spyOn(userService, "all").mockImplementation(() => Promise.resolve([]));

            await userController.getAll(req, res, next);

            expect(userService.all).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([]);
        })
    });

});
