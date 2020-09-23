import { Model, DataTypes } from 'sequelize';
import { Connection } from '../connections';
import dotenv from 'dotenv';

dotenv.config();

class UserGroup extends Model {
    public userId!: string;
    public group_id!: string;
}

UserGroup.init(
    {
        userId: {
            allowNull: false,
            field: 'user_id',
            primaryKey: true,
            type: DataTypes.UUID
        },
        groupId: {
            allowNull: false,
            field: 'group_id',
            primaryKey: true,
            type: DataTypes.UUID
        }
    }, {
        sequelize: Connection,
        timestamps: false,
        schema:  process.env.DB_SCHEMA_NAME || 'public',
        tableName: 'user_groups',
        modelName: 'UserGroup'
    }
);

export default UserGroup;