'use strict';

const Service = require('egg').Service;
const uuidv4 = require('uuid/v4');

class UserService extends Service {
  /**
     *  根据手机号查找某个用户是否存在
     */
  async findUserByPhone(phone) {
    const { app } = this;
    const userObj = await app.model.Users.findUserByPhone(phone);
    return userObj;
  }

  /**
     *  以电话号码的形式新建一个用户，在进行保存之前先将用户密码进行一下加密
     */
  async newUserByPhone(phone, password) {
    const { app, ctx } = this;
    const savePassword = ctx.helper.encodePassword(password);
    const userSchemaObj = {
      id: uuidv4(),
      phone,
      password: savePassword,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    const result = await app.model.Users.newUserByPhone(userSchemaObj);
    return result;
  }
}

module.exports = UserService;
