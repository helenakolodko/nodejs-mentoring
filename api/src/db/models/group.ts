import { Model, DataTypes } from 'sequelize';
import { Connection } from '../postgresConnection';
import { Permission } from '../../entities/group/group.interface';

class Group extends Model {
    public id!: string;
    public name!: string;
    public permissions!: Array<Permission>;
}

Group.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        permissions: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    },
    {
        sequelize: Connection,
        timestamps: false,
        schema: 'public',
        tableName: 'groups',
        modelName: 'Group'
    }
);

export default Group;
