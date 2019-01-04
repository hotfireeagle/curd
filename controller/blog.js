const BlogModel = require('../model/blog');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const isLogin = require('../util/isLogin');

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

    /**
     *  URL格式形如：/blog/delete?id=1，其中id表明的就是这个文档的唯一_id值
     */
    async deleteBlog(req, res, next) {
        let id = req.query.id || '';
        let token = req.headers['sin-access-token'] || req.headers['Sin-Access-Token'] || '';
        if (!isLogin(token)) {        // 说明还没有登录上
            res.json({
                status: 0,
                message: '未登录'
            });
            return;
        }
        try {
            id = mongoose.Types.ObjectId(id);
        } catch (err) {
            console.error('非法id，这个id并不合法');
        }
        BlogModel.findByIdAndRemove(id, (err, blog) => {
            if (err) {
                res.json({
                    status: 0,
                    message: '删除文章失败'
                });
                return;
            }
            res.json({
                status: 1,
                message: '成功删除文章'
            });
        });
    }

    /**
     *  TODO: 通过文章的标题来删除所有符合标题的文章；URL形式为：/blog/delete?title=a test title
     */
    async deleteBlogByTitle(req, res, next) {
        let title = req.query.title || '';
        let token = req.headers['sin-access-token'] || req.headers['Sin-Access-Token'];
        if (!isLogin(token)) {
            res.json({
                status: 0,
                message: '未登录'
            });
            return;
        }
        BlogModel.find({ title }, (err, docs) => {
            if (err) {
                res.json({
                    status: 0,
                    message: '查询数据库的过程中发生错误'
                });
            }
            docs.map(doc => {
                doc.remove((err, product) => {
                    if (err) {
                        res.json({
                            status: 0,
                            message: '删除文章的过程中发生错误'
                        });
                        return;
                    }
                });
            });
            res.json({
                status: 1,
                message: '成功删除该标题的所有文章'
            });
        });
    }

    /**
     *  更新文章的接口,根据id来进行删除，URL格式形如：/blog/update，这是一个POST请求，文章id等修改数据都在body里面
     *  POST 传递的参数有：{ id: required, title: required, tag, content, love, views }
     */
    async updateBlog(req, res, next) {
        let token = req.headers['sin-access-token'] || req.headers['Sin-Access-Token'];
        if (!isLogin(token)) {
            res.json({
                status: 0,
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
                return;
            }
            let { id, title, tag, content, love, views } = fields;
            try {
                if (!id) { throw new Error('缺少文章id'); }
                if (!title) { throw new Error('缺少文章标题'); }
            } catch(err) {
                res.json({
                    status: 0,
                    message: err.message
                });
            }
            try {
                id = mongoose.Types.ObjectId(id);
            } catch(err) {
                res.json({
                    status: 0,
                    message: '文章id参数不合法'
                });
                return;
            }
            // 更新指定id的文章
            try {
                await BlogModel.findOneAndUpdate({ _id: id }, { $set: { title, tag, content, love, views } });
                res.json({
                    status: 1,
                    message: '更新文章成功'
                });
            } catch(err) {
                res.json({
                    status: 0,
                    message: '更新文章的过程中发生错误'
                });
            }
        });
    }

    /**
     *  获取文章列列表数据，无需登录；TODO: 符合antd分页标准，POST请求，每页多少条数据length以及第几页page和tag信息都放在body里面
     */
    async getBlogs(req, res, next) {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.json({
                    status: 0,
                    message: '参数解析错误'
                });
                return;
            }
            let { length=10, page=1, tag='' } = fields;
        });
    }
}

module.exports = new BlogController();