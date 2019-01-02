const BlogModel = require('../model/blog');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');

const config = require('../config.json');

class BlogController {
    constructor() {
        this.createBlog = this.createBlog.bind(this);
    }

    /**
     * 创建一篇文章
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createBlog(req, res, next) {
        let token = req.headers['sin-access-token'] || req.headers['Sin-Access-Token'];
        jwt.verify(token, config.tokenSecret, (err) => {
            if (err) {
                res.json({
                    status: 2,
                    message: '未登录'
                });
                return;
            }
            let form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: '解析参数发生错误'
                    });
                }
                const { title, tag, content, createTime, views, love } = fields;
                try {
                    if (!title) { throw new Error('必须填写文章标题'); }
                    if (!content) { throw new Error('必须填写文章内容'); }
                } catch(err) {
                    res.json({
                        status: 0,
                        message: err.message
                    });
                    return;
                }
                const newBlog = new BlogModel({ title, tag, content, createTime, views, love });
                newBlog.save((err) => {
                    if (err) {
                        res.json({
                            status: 0,
                            message: '保存文章到数据库发生错误'
                        });
                    } else {
                        res.json({
                            status: 1,
                            message: '成功创建新文章'
                        });
                    }
                });
            });
        });
    }
}

module.exports = new BlogController();