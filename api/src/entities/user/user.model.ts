import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/mentoring');

export class User extends Model {}

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
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        timestamps: false,
        schema: 'public',
        modelName: 'user'
    }
);
