const Controller = require('egg').Controller;

class UserController extends Controller {

  /** 微信登录的方法 */
  async loginByWechat() {

  }

  /** 手机号登录的方法，登录成功的话签发token */
  async login() {
    const { ctx } = this;
    const { phone, password } = ctx.request.body;
    const rule = {
      phone: { type: 'number', required: true },
      password: { type: 'string', required: true }
    };
    ctx.validate(rule, ctx.request.body); // 验证失败的话，会抛错，错误会被定义的中间件给捕获
    const userObj = await ctx.service.user.findUserByPhone(phone);
    if (!userObj) throw new Error(`不存在${phone}这个用户`);
    const md5Password = ctx.helper.encodePassword(password);
    if (md5Password !== userObj.password) {
      throw new Error('密码错误');
    }
    // 如果存在这个用户的话，那么给他签发一个token。对于多端登录的情况如何考虑？没事，不同端对应不同的token，但是这个token最终都会关联到一个账户上面
    const token = ctx.helper.createToken({ id: userObj.id });
    ctx.body = { status: 1, obj: token, errorMes: null };
  }

  /** 微信号注册方法 */
  async registerByWechat() {

  }

  /** 手机号注册新用户，手机号和密码是必填项 */
  async register() {
    const { ctx } = this;
    const { phone, password } = ctx.request.body;
    const rule = {
      phone: { type: 'number', required: true },
      password: { type: 'string', required: true },
    };
    ctx.validate(rule, ctx.request.body); // 验证失败会报错，此时会被我们所定义的errorHandler中间件捕获到错误
    const userObj = await ctx.service.user.findUserByPhone(phone);
    if (userObj) throw new Error('该手机号已被注册');
    const result = await ctx.service.user.newUserByPhone(phone, password);
    ctx.body = { status: 1, obj: result, errorMes: null };
  }
}

module.exports = UserController;
