const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: String,
    password: String,
    token: { type: String, default: '' }                     // 用户所对应的token
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;