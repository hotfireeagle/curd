'use strict';

/**
 *  README: 整个应用常用到的工具方法
 */
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const md5 = string => crypto.createHash('md5').update(string).digest('base64');
const EXPIRES = 24 * 60 * 60 * 1000 * 30; // token有效期默认为30天
const CERT = fs.readFileSync(path.join(__dirname, '../../rsa_private_key.pem'));

module.exports = {
  /**
     * 签发token
     * @param {Object} data : data里面应该包含用户数据，这样才能够把token和用户关联起来
     * @param {Number} lifeTime : token有效期，单位是ms
     */
  createToken(data, lifeTime = EXPIRES) {
    const expires = Date.now() + lifeTime;
    const token = jwt.sign({ data, expires }, CERT, { algorithm: 'RS256' });
    return token;
  },

  /**
   * 对密码进行加密
   * @param {string} password : 用户输入的原密码
   */
  encodePassword(password) {
    const result = md5(md5(password) + md5(password).substr(1, 6));
    return result;
  },
};
