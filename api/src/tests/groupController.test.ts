import { v4 as uuidv4 } from "uuid";
import createError from 'http-errors';
import { GroupService } from '../entities/group/group.service';
import { GroupController } from '../entities/group/group.controller';
import { GroupInterface } from "../entities/group/group.interface";

const notFoundError = createError(404);
const error = new Error();

const req: any = {
    body: {
        name: 'test',
        permissions: '[READ, WRITE]'
    },
    params: { id: uuidv4() },
    query: {}
};

const addUsersReq: any = {
    body: {
        userIds: []
    },
    params: { id: uuidv4() },
    query: {}
};

const res: any = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const next = jest.fn();

const groupService = new GroupService();
const groupController = new GroupController(groupService);

describe("GroupController", () => {
    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    describe("getById", () => {
        it('should return group by id', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve({ id } as any));

            await groupController.getById(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ id: req.params.id });
            expect(res.json).toHaveBeenCalledTimes(1);
        })

        it('should return 404 error if no group found', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(null));

            await groupController.getById(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(res.json).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })

        it('should return Error in case of service error', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.reject(error));

            await groupController.getById(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });

    describe("updateGroup", () => {
        it('should update group by id', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "update").mockImplementation((user) => Promise.resolve());

            await groupController.updateGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.update).toBeCalledTimes(1);
            expect(groupService.update).toBeCalledWith(group);
            expect(res.sendStatus).toBeCalledWith(200);
        })

        it('should return 404 error if no group found', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(null));
            jest.spyOn(groupService, "update").mockImplementation((user) => Promise.resolve());

            await groupController.updateGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.update).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })

        it('should return Error in case of service error', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "update").mockImplementation((group) => Promise.reject(error));

            await groupController.updateGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.update).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });

    describe("createGroup", () => {
        it('should create group', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;
            jest.spyOn(groupService, "newGroup").mockImplementation((group) => Promise.resolve());

            await groupController.createGroup(req, res, next);

            expect(groupService.newGroup).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toBeCalledWith(200);
        })

        it('should return Error in case of service error', async () => {
            jest.spyOn(groupService, "newGroup").mockImplementation((group) => Promise.reject(error));

            await groupController.createGroup(req, res, next);

            expect(groupService.newGroup).toHaveBeenCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });

    describe("deleteGroup", () => {
        it('should delete group by id', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "hardDelete").mockImplementation((user) => Promise.resolve());

            await groupController.deleteGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.hardDelete).toBeCalledTimes(1);
            expect(res.sendStatus).toBeCalledWith(200);
        })

        it('should return 404 error if no group found', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(null));
            jest.spyOn(groupService, "hardDelete").mockImplementation((user) => Promise.resolve());

            await groupController.deleteGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.hardDelete).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toHaveBeenCalledWith(notFoundError);
        })

        it('should return Error in case of service error', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "hardDelete").mockImplementation((user) => Promise.reject(error));

            await groupController.deleteGroup(req, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.hardDelete).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });

    describe("getAll", () => {
        it('should get list of all groups', async () => {
            const users = [{ id: req.params.id, ...req.body } as
                GroupInterface];
            jest.spyOn(groupService, "all").mockImplementation(() => Promise.resolve(users));

            await groupController.getAll(req, res, next);

            expect(groupService.all).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(users);
        })

        it('should return empty list if no groups  exist', async () => {
            jest.spyOn(groupService, "all").mockImplementation(() => Promise.resolve([]));

            await groupController.getAll(req, res, next);

            expect(groupService.all).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([]);
        })

        it('should return Error in case of service error', async () => {
            jest.spyOn(groupService, "all").mockImplementation(() => Promise.reject(error));

            await groupController.getAll(req, res, next);

            expect(groupService.all).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(createError(500, `Failed to get groups\n${error}`));
        });
    });

    describe("addUsers", () => {
        it('should add users to a group', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "addUsers").mockImplementation((groupId, users) => Promise.resolve());

            await groupController.addUsers(addUsersReq, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.addUsers).toBeCalledTimes(1);
            expect(res.sendStatus).toBeCalledWith(200);
        });

        it('should return 404 error if no group found', async () => {
            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(null));
            jest.spyOn(groupService, "addUsers").mockImplementation((groupId, users) => Promise.resolve());

            await groupController.addUsers(addUsersReq, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.addUsers).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(notFoundError);
        });

        it('should return Error in case of service error', async () => {
            const group = { id: req.params.id, ...req.body } as GroupInterface;

            jest.spyOn(groupService, "getById").mockImplementation((id) => Promise.resolve(group));
            jest.spyOn(groupService, "addUsers").mockImplementation((groupId, users) => Promise.reject(error));

            await groupController.addUsers(addUsersReq, res, next);

            expect(groupService.getById).toBeCalledTimes(1);
            expect(groupService.addUsers).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });

    });
});
