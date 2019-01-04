const express = require('express');
const TagController = require('../../controller/tag');

const tag = express.Router();

tag.post('/new', TagController.new);
tag.get('/all', TagController.get);

module.exports = tag;