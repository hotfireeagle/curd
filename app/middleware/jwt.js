/**
 * README: 得支持多设备登录，因此需要保证在这几个端上面都是对应着一个token。
 * 既然是这样的话，那么就需要在登录的时候别立马签发一个新的token，先看看库里是否存在这个用户的token，如果有的话，那么就签发这个token，同时更新时间
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const PEM_PATH = path.join(__dirname, '../../rsa_public_key.pem');
const STATUS = { "NO_USER": -1, "EXPIRED": 0, "OK": 1 };

/** 获取公钥内容 */
let cert = null;
(() => {
    try {
        cert = fs.readFileSync(PEM_PATH);
    } catch(err) {
        console.error(err);
    }
})();

/**
 * 验证token是否有效
 * @param {String} token : token串
 */
const verifyToken = token => {
    const result = jwt.verify(token, cert, { algorithms: ['RS256'] });
    if (!result) return { status: STATUS.NO_USER, data: null };
    const { expires } = result;
    const current = Date.now();
    if (current <= expires) return { status: STATUS.OK, data: result.data };
    else return { status: STATUS.EXPIRED, data: null };
}

module.exports = (options, app) => {
    return async function userInterceptor(ctx, next) {
        let authToken = ctx.header.authorization;                   // 从客户端中的请求头中取出token数据
        if (authToken) {
            const verifyResult = verifyToken(authToken);
            switch(verifyResult.status) {
                case STATUS.OK:                                    // 只要是平台所签发的token，就认为是认证通过的
                    await next();
                    break;
                case STATUS.NO_USER:
                    ctx.body = { status: 2, errorMes: "不存在该用户" };
                    break;
                case STATUS.EXPIRED:
                    ctx.body = { status: 2, errorMes: "登录已过期" };
                    break;
                default:
                    ctx.body = { status: 2, errorMes: "登录失败" };
            }
        } else {                                                    // 除了已经放开登录的接口之外都必须要携带token数据
            ctx.body = { status: 3, errorMes: "未登录" };
        }
    };
}