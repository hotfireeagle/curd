'use strict';

const db = require('../../database/db');

module.exports = app => {
  const userSchema = require('../schema/users')(app);
  const databaseConfig = {
    timestamps: true, // false表示不会自动添加updatedAt和createdAt
    freezeTableName: true,
  };
  const users = db.defineModel(app, 'users', userSchema, databaseConfig);

  /** 可以在这里实现一些操作数据库的方法 */

  /**
   * 根据手机号查找用户
   */
  users.findUserByPhone = async phone => {
    const sqlCondition = {
      where: { phone },
      attributes: [ 'id', 'password' ],
    };
    const response = await users.findOne(sqlCondition);
    return response;
  };


  /**
   * 根据手机号创建新用户
   */
  users.newUserByPhone = async userSchemaObj => {
    const result = await users.create(userSchemaObj);
    return result;
  };


  return users;
};
