const TagModel = require('../model/tag');
const isLogin = require('../util/isLogin');
const formidable = require('formidable');

class TagController {
    constructor() {
        this.new = this.new.bind(this);
        this.get = this.get.bind(this);
    }

    /** 创建一个新的标签，标签不允许同名 */
    async new(req, res, next) {
        let token = req.headers['sin-access-token'] || req.headers['Sin-Access-Token'];
        if (!isLogin(token)) {
            res.json({
                status: 0,
                message: '未登录'
            });
            return;
        }
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if(err) {
                res.json({
                    status: 0,
                    message: '解析POST参数发生错误'
                });
                return;
            }
            let { value } = fields;
            try {
                if (!value) {
                    throw new Error('必须传value参数');
                }
            } catch(err) {
                res.json({
                    status: 0,
                    message: err.message
                });
                return;
            }
            TagModel.find({value}, (err, docs) => {
                if(err) {
                    res.json({
                        status: 0,
                        message: '查询数据库发生错误'
                    });
                    return;
                }
                if (docs && docs.length > 0) {
                    res.json({
                        status: 0,
                        message: '该标签已存在'
                    });
                    return;
                }
                let newTag = new TagModel({value});
                newTag.save(err => {
                    if (err) {
                        res.json({
                            status: 0,
                            message: '创建tag的时候发生错误'
                        });
                        return;
                    }
                    res.json({
                        status: 1,
                        message: '成功创建tag'
                    });
                });
            });
        });
    }

    /** 获取所有标签，不做分页处理 */
    async get(req, res, next) {
        TagModel.find({}, (err, docs) => {
            if (err) {
                res.json({
                    status: 0,
                    message: '查询数据库发生错误'
                });
                return;
            }
            res.json({
                status: 1,
                message: '查询成功',
                data: docs
            });
        });
    }
}

module.exports = new TagController();