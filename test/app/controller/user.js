'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test /app/controller/user.test.js', () => {
  it('should validate failed when no phone', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/api/user/register')
      .send({
        password: '123',
      })
      .expect(422);
  });
});
