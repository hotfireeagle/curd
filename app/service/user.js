"use strict";

const Service = require("egg").Service;
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");

const md5 = string => crypto.createHash("md5").update(string).digest("base64");

const encodePassword = password => md5(md5(password) + md5(password).substr(3, 6));

class UserService extends Service {
    /**
     *  根据手机号查找某个用户是否存在
     */
    async findUserByPhone(phone) {
        const { app } = this;
        let userObj = await app.model.Users.findUserByPhone(phone);
        return userObj;
    }

    /**
     *  以电话号码的形式新建一个用户，在进行保存之前先将用户密码进行一下加密
     */
    async newUserByPhone(phone, password) {
        const { app } = this;
        const savePassword = encodePassword(password);
        let userSchemaObj = {
            id: uuidv4(),
            phone,
            password: savePassword,
            created_at: Date.now(),
            updated_at: Date.now()
        };
        let result = await app.model.Users.newUserByPhone(userSchemaObj);
        return result;
    }
}

module.exports = UserService;