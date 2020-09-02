import { Op } from 'sequelize';
import type { UserInterface } from './user.interface';
import { User } from './user.model';

export class UserService {

    getById = async (id: string) => {
        const user = await User.findOne({ where: { id: id } });
        if (user != null) {
            return this.toUserInterface(user);
        }
        else {
            return null;
        }
    }

    all = async (): Promise<Array<UserInterface>> => {
        const users = await User.findAll();
        return users.map(user => this.toUserInterface(user));
    }

    getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<Array<UserInterface>> => {
        var users = await User.findAll({
            where: {
                login: { [Op.substring]: loginSubstring }
            },
            limit: limit
        });
        return users.map(user => this.toUserInterface(user));
    }

    allLogins = async (): Promise<Array<string>> => {
        const logins = await User.findAll({ attributes: ['login'] });
        return logins.map(user => this.toUserInterface(user).login);
    }

    newUser = async (user: UserInterface) => {
        console.debug(user);
        const created = await User.create(user);
        return;
    }

    update = async (user: UserInterface) => {
        const updated = await User.update(user, {
            where: {
                id: user.id
            }
        });
    }

    softDelete = async (user: UserInterface) => {
        const deleted = await User.update({ isDeleted: true }, {
            where: {
                id: user.id
            }
        });
    }

    private toUserInterface(user: User): UserInterface {
        return <UserInterface>user.toJSON();
    }
}
