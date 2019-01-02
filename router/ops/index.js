const admin = require('./admin');
const blog = require('./blog');

const ops = app => {
    app.use('/admin', admin);
    app.use('/blog', blog);
}

module.exports = ops;