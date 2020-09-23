import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const Connection = new Sequelize(
    process.env.DB_NAME || 'users',
    process.env.DB_USER || 'admin',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost', 
      port: Number(process.env.DB_PORT) || 5432,    
      dialect: <"postgres" | "mysql" | "sqlite" | "mariadb" | "mssql" | undefined>process.env.DB_DIALECT || 'postgres'
    }
);
