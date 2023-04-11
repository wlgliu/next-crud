import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_HOST = process.env.DB_HOST as string

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: 3306,
        dialect: 'mysql'
    }
)

export default sequelize