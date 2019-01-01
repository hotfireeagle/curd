const express = require('express');
const AdminController = require('../../controller/admin');

const admin = express.Router();

admin.post('/login', AdminController.login);

module.exports = admin;