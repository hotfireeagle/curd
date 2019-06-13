/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560326892448_7683';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    password: "000000",               // 这是一个测试密码，实际运行时需替换
    port: 3306,
    database: "curd"
  };

  config.jwt = {
    enable: true,
    ignore: [''],                     // 在这里声明无需拦截登录的接口
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
