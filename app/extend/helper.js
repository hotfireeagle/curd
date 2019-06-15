/**
 *  README: 整个应用常用到的工具方法
 */
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");


const EXPIRES = 24 * 60 * 60 * 1000 * 30;                                           // token有效期默认为30天
const CERT = fs.readFileSync(path.join(__dirname, "../../rsa_private_key.pem"));

module.exports = {
    /**
     * 签发token
     * @param {Object} data 
     * @param {Number} lifeTime : token有效期，单位是ms
     */
    createToken(data, lifeTime=EXPIRES) {
        const expires = Date.now() + lifeTime;
        const token = jwt.sign({ data, expires }, CERT, { algorithm: "RS256" });
        return token;
    }
};