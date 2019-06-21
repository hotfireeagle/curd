'use strict';

const Service = require('egg').Service;
const { work } = require('../puppeteer/index');

class SpiderService extends Service {

  async loadData() {
    console.log('run');
    await work();
  }

}

module.exports = SpiderService;