/**
 *  判断用户是否进行登录
 */
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const isLogin = token => {
    let result = true;
    try {
        jwt.verify(token, config.tokenSecret);
    } catch(err) {
        result = false;
    }
    return result;
}

module.exports = isLogin;