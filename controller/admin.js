const AdminModel = require('../model/admin');
const crypto = require('crypto');
const formidable = require('formidable');

/**
 *  FEATURE: 不支持注册管理员用户
 */
class AdminController {
    constructor() {
        this.login = this.login.bind(this);
        this.encryption = this.encryption.bind(this);
        this.md5 = this.md5.bind(this);
    }

    async login(req, res, next) {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    status: 0,
                    message: '表单信息错误'
                });
                return;
            }
            const { userName, password } = fields;
            try {
                if (!userName) {
                    throw new Error('用户名参数错误');
                }
                if (!password) {
                    throw new Error('密码参数错误');
                }
            } catch(err) {
                res.send({
                    status: 0,
                    message: err.message
                });
                return;
            }
            const newPassword = this.encryption(password);
            try {
                const admin = await AdminModel.findOne({userName});
                if (!admin) {
                    res.send({
                        status: 0,
                        message: '不存在该用户'
                    });
                } else if (newPassword.toString() !== admin.password.toString()) {
                    res.send({
                        status: 0,
                        message: '密码错误'
                    });
                } else {
                    res.send({
                        status: 1,
                        message: '登录成功'
                    });
                }
            } catch(err) {
                res.send({
                    status: 0,
                    message: '数据错误'
                });
            }
        });
    }

    /** 密码加密辅助方法 */
    encryption(password) {
        const newPassword = this.md5(this.md5(password).substr(3, 6) + this.md5(password));
        return newPassword;
    }

    md5(string) {
        const md5Method = crypto.createHash('md5');
        return md5Method.update(string).digest('base64');
    }
}

module.exports = new AdminController();