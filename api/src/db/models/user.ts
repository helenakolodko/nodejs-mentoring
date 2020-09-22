import { Model, DataTypes } from 'sequelize';
import { Connection } from '../connections';
import dotenv from 'dotenv';

dotenv.config();

class User extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted?: boolean;
}

User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        login: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        isDeleted: {
            allowNull: false,
            defaultValue: false,
            field: 'is_deleted',
            type: DataTypes.BOOLEAN
        }
    }, 
    {
        sequelize: Connection,
        timestamps: false,
        schema:  process.env.DB_SCHEMA_NAME || 'public',
        tableName: 'users',
        modelName: 'User'
    }
);

export default User;
