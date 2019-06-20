'use strict';

/**
 *  @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  /** 用户相关路由开始 */
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  /** 用户相关路由结束 */
};
