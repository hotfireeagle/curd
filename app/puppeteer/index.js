'use strict';

const { initBrowser, closePage, sleep } = require('./util');
const topicWork = require('./works/topics');

const work = async () => {
  await sleep();
  await initBrowser();
  await topicWork();
  await closePage();
}

module.exports = {
  work
};