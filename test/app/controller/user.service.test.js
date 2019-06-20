'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('测试service.user文件', () => {

  it('存在用户时，测试findUserByPhone方法应该成功返回', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.findUserByPhone(123);
    assert(user.id !== null);
  });

  it('不存在用户时，测试findUserByPhone方法应该返回null', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.findUserByPhone(888);
    assert(Object.prototype.toString.call(user) === '[object Null]');
  });

  it('参数正常时，测试newUserByPhone方法能够正常执行', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.newUserByPhone(1511, 'aha');
    assert(result && result.id !== null);
  });
});
