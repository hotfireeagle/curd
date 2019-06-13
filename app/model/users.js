const db = require("../../database/db");

module.exports = app => {
    const userSchema = require("../schema/users");
    const databaseConfig = {
        timestamps: true,                           // false表示不会自动添加updatedAt和createdAt
        freezeTableName: true
    };
    const users = db.defineModel(app, "users", userSchema, databaseConfig);

    /** 可以在这里实现一些操作数据库的方法 */
};