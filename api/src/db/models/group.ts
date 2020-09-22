import { Model, DataTypes } from 'sequelize';
import { Connection } from '../connections';
import { Permission } from '../../entities/group/group.interface';
import dotenv from 'dotenv';

dotenv.config();

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
        schema:  process.env.DB_SCHEMA_NAME || 'public',
        tableName: 'groups',
        modelName: 'Group'
    }
);

export default Group;
