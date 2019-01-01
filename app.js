const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config.json');
// const api = require('./router/api/');
const ops = require('./router/ops/');

const app = express();
mongoose.connect(config.mongodbUrl, { useNewUrlParser: true });

app.use(morgan('combined'));
ops(app);

app.listen(8080, () => {
    console.log('port 8080');
});