'use strict';

/**
 *  @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  
  /** 用户相关路由开始 */
  router.post("/api/user/register", controller.user.register);
  /** 用户相关路由结束 */
};
