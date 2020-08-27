import type { User } from '../types/user';

const users: Map<string, User> = new Map();

export default class UserService {
    static getById(id: string) {
        return users.get(id);
    }

    static all() {
        return Array.from(users.values());
    }

    static getAutoSuggestUsers(loginSubstring: string, limit: number) {
        return this.all()
            .filter(({ login }) => login?.includes(loginSubstring))
            .slice(0, limit);
    }

    static allLogins() {
        return Array.from(users.values()).map(({ login }) => login);
    }

    static newUser(user: User) {
        users.set(user.id, user);
    }

    static update(user: User) {
        users.set(user.id, user);
    }

    static softDelete(user: User) {
        users.set(user.id, { ...user, isDeleted: true });
    }
}
