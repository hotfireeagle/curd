const express = require('express');
const BlogController = require('../../controller/blog');

const blog = express.Router();

blog.post('/new', BlogController.createBlog);
blog.get('/delete', BlogController.deleteBlog);
blog.get('/deleteByTitle', BlogController.deleteBlogByTitle);
blog.post('/update', BlogController.updateBlog);

module.exports = blog;