'use strict';

const Subscription = require('egg').Subscription;

class Spider extends Subscription {

  static get schedule() {
    return {
      cron: '0 */1 * * * *' ,       // 每1分钟执行一次
      type: 'all'
    };
  }

  async subscribe() {
    this.ctx.service.spider.loadData();
  }
}

module.exports = Spider;