const admin = require('./admin');

const ops = app => {
    app.use('/admin', admin);
}

module.exports = ops;