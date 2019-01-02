const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('blog module test', function() {
    let request;

    // TODO: 先要获取一下token
    beforeEach(function() {
        request = supertest(app)
            .post('/blog/new')
            .set('Accept', 'application/json')
    });
});