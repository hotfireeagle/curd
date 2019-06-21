/**
 * get readhub.com's topic data
 */

'use strict';

const cheerio = require('cheerio');
const { gotoPage, sleep } = require('../util');
const R = require('ramda');

const ROOT_URL = 'https://readhub.cn/topics';

const topicWork = async () => {
  const response = await gotoPage(ROOT_URL);
  const html = await response.text();
  const $ = cheerio.load(html);
  const aList = $('a');
  const idArr = findUsefulA(aList);
  console.log('共有多少篇链接', idArr.length);
};

/** 找出当前页面有用的文章链接 */
const findUsefulA = (arr) => {
  let result = [];
  const operation = aEle => {
    let href = cheerio(aEle).attr('href');
    if (href && href.startsWith('/topic/')) {
      let title = cheerio(aEle).text();
      result.push(title);
      console.log(title);
    }
  }
  R.forEach(operation)(arr);
  return result;
}

module.exports = topicWork;