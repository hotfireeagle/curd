'use strict';

const puppeteer = require('puppeteer');


const initBrowser = async () => {
  global.pBrowser = await puppeteer.launch({ headless: false });
  global.pPage = await pBrowser.newPage();
};

const gotoPage = async url => {
  const response = await pPage.goto(url, { waitUntil: 'networkidle2' });
  return response;
}

const closePage = async () => {
  await pBrowser.close();
  global.pPage = null;
  global.pBrowser = null;
}

const sleep = () => new Promise(resolve => {
  let ms = 2000 + Math.random() * 1000;
  setTimeout(() => { resolve(); }, ms);
});

module.exports = {
  initBrowser,
  gotoPage,
  closePage,
  sleep
};