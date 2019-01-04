const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    tag: { type: String, default: 'All' },                // 博文标签
    title: { type: String, default: '' },                 // 博文标题
    content: { type: String, default: '' },               // 博文正文
    createTime: { type: Number, default: Date.now() },    // 创建时间，在这里存储的是时间戳
    views: { type: Number, default: 0 },                  // 查看次数
    love: { type: Number, default: 0 },                   // 点赞次数
});

BlogSchema.index({ createTime: 1 });

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;