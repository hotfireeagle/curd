const admin = require('./admin');
const blog = require('./blog');
const tag = require('./tag');

const ops = app => {
    app.use('/admin', admin);
    app.use('/blog', blog);
    app.use('/tag', tag);
}

module.exports = ops;