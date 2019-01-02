const BlogModel = require('../model/blog');
const formidable = require('formidable');
const jwt = require('jwt');

const config = require('../config.json');

class BlogController {
    constructor() {
        this.createBlog = this.createBlog.bind(this);
    }

    /**
     * 创建一篇博文
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createBlog(req, res, next) {

    }
}

module.exports = new BlogController();