import Sequelize from "sequelize";
import sequelize from "@/util/database";

const db = sequelize

// https://dev.to/francescoxx/build-a-crud-rest-api-in-javascript-using-nodejs-express-postgres-docker-jkb
// 用gpt写一个sql
// 帮我写一个sql语句，一张名为user的mysql表，有id, name, email三个字段，id 为INTEGER类型 自增 不能为空，name和email 为字符串类型
const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
}, {
    tableName: 'users'
})

export default User