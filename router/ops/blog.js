const express = require('express');
const BlogController = require('../../controller/blog');

const blog = express.Router();

blog.post('/new', BlogController.createBlog);
blog.get('/delete', BlogController.deleteBlog);                // /blog/delete?id=12343412
blog.get('/deleteByTitle', BlogController.deleteBlogByTitle);  // /blog/deleteByTitle?title=atitle

module.exports = blog;