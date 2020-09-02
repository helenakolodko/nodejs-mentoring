import type { User } from './user.interface';

export class UserService {
    users: Map<string, User>;

    constructor() {
        this.users = new Map();
    }

    getById = async (id: string) => {
        return this.users.get(id);
    }

    all = async () => {
        return Array.from(this.users.values());
    }

    getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
        var users = await this.all();
        return users.filter(({ login }) => login?.includes(loginSubstring))
            .slice(0, limit);
    }

    allLogins = async () => {
        return Array.from(this.users.values()).map(({ login }) => login);
    }

    newUser = async (user: User) => {
        this.users.set(user.id, user);
    }

    update = async (user: User) => {
        this.users.set(user.id, user);
    }

    softDelete = async (user: User) => {
        this.users.set(user.id, { ...user, isDeleted: true });
    }
}
