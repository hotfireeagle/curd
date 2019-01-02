const express = require('express');
const BlogController = require('../../controller/blog');

const blog = express.Router();

blog.post('/new', BlogController.createBlog);

module.exports = blog;