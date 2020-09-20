import type { GroupInterface } from './group.interface';
import { Group, UserGroup } from '../../db/models';
import { Connection } from '../../db/postgresConnection';

export class GroupService {

    getById = async (id: string) => {
        const group = await Group.findByPk(id);
        if (group != null) {
            return this.toGroupInterface(group);
        }
        else {
            return null;
        }
    }

    all = async (): Promise<Array<GroupInterface>> => {
        const groups = await Group.findAll();
        return groups.map(group => this.toGroupInterface(group));
    }

    allGroupNames = async (): Promise<Array<string>> => {
        const logins = await Group.findAll({ attributes: ['name'] });
        return logins.map(group => this.toGroupInterface(group).name);
    }

    addUsers = async (groupId: string, users: Array<string>) => {
        return await Connection.transaction(async transaction => {
            const added = users.map(async (userId) => {
                return UserGroup.create(
                    {
                        userId: userId,
                        groupId: groupId,
                    },
                    {
                        transaction,
                    }
                );
            });
            await Promise.all(added);
        });
    }

    newGroup = async (group: GroupInterface) => {
        console.debug(group);
        const created = await Group.create(group);
    }

    update = async (group: GroupInterface) => {
        const updated = await Group.update(group, {
            where: {
                id: group.id
            }
        });
    }

    hardDelete = async (group: GroupInterface) => {
        Connection.transaction(async transaction => {
            await Group.destroy({ where: { id: group.id }, transaction });
            await UserGroup.destroy({ where: { groupId: group.id }, transaction });
        });
    }

    private toGroupInterface(group: Group): GroupInterface {
        return <GroupInterface>group.toJSON();
    }
}
