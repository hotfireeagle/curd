'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('/api/user/register: 参数校验不通过的时候HTTP响应码应该是422', () => {
    return app.httpRequest()
      .post('/api/user/register')
      .send({
        password: '123',
      })
      .expect(422);
  });

  it('/api/user/register: 参数校验不通过的时候数据状态码应该是2', () => {
    app.httpRequest()
      .post('/api/user/register')
      .send({
        phone: 123,
        password: 123,
      })
      .expect({
        status: 2,
      });
  });

  it('/api/user/register: 正常参数进行注册的话应该可以正常注册', () => {
    app.httpRequest()
      .post('/api/user/register')
      .send({
        phone: 1234,
        password: 'a test password',
      })
      .expect({
        status: 1,
      });
  });

  it('/api/user/register: 同一个号码不能够多次注册', () => {
    app.httpRequest()
      .post('/api/user/register')
      .send({
        phone: 1234,
        password: ' word2',
      })
      .expect({
        status: 2,
      });
  });

  it('/api/user/login: 密码不是字符串的话应该校验参数失败', () => {
    app.httpRequest()
      .post('/api/user/login')
      .send({
        phone: 1234,
        password: 1234,
      })
      .expect({
        status: 2,
      });
  });

  it('/api/user/login: 缺少密码的话应该校验参数失败', () => {
    app.httpRequest()
      .post('/api/user/login')
      .send({
        phone: 1234,
      })
      .expect({
        status: 2,
      });
  });

  it('/api/user/login: 正常参数应该能够正常登陆', () => {
    app.httpRequest()
      .post('/api/user/login')
      .send({
        phone: 1234,
        password: 'a test password',
      })
      .expect({
        status: 1,
      });
  });

});
