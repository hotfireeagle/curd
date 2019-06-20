'use strict';

const Service = require('egg').Service;
const $ = require('cheerio');
const puppeteer = require('puppeteer');

class SpiderService extends Service {

  async loadData() {
    console.log('执行定时方法');
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    let response = await this.page.goto('https://readhub.cn/topics', {waitUntil: 'networkidle2'});
    let html = await response.text();
    console.log('html is', html);
  }


}

module.exports = SpiderService;