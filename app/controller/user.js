const Controller = require("egg").Controller;

class UserController extends Controller {

    /** 微信登录的方法 */
    async loginByWechat() {

    }

    /** 手机号登录的方法 */
    async login() {

    }

    /** 微信号注册方法 */
    async registerByWechat() {

    }

    /** 手机号注册新用户，手机号和密码是必填项 */
    async register() {
        const { ctx } = this;
        const { phone, password } = ctx.request.body;
        const rule = {
            phone: "number",
            password: { type: "string", required: true }
        };
        ctx.validate(rule, ctx.request.body);                                   // 验证失败会报错，此时会被我们所定义的errorHandler中间件捕获到错误
        let userObj = await ctx.service.user.findUserByPhone(phone);
        if (userObj) {
            ctx.body = { status: 2, obj: null, errorMes: "该手机号已注册" };
            return;
        }
        let result = await ctx.service.user.newUserByPhone(phone, password);
        ctx.body = { status: 1, obj: result, errorMes: null };
    }
}

module.exports = UserController;