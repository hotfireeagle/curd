const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('blog module test', function() {
    let request, token;
    let newArticleTitle = 'from mocha run npm test'

    before(async function() {
        try {
            let res = await supertest(app)
                .post('/admin/login')
                .set('Accept', 'application/json')
                .send({ userName: 'admin', password: 'admin' })
                .expect(200);
            let response = JSON.parse(res.text);
            expect(response).to.have.property('status').and.to.equal(1);
            token = res.headers['sin-access-token'];
        } catch(err) {
            throw new Error(err);
        }
    });

    beforeEach(function() {
        request = supertest(app)
            .post('/blog/new')
            .set('Accept', 'application/json');
    });

    it('create a new blog with correct params', function(done) {
        request
            .set('Sin-Access-Token', token)
            .send({title: newArticleTitle, content: 'use mocha to test javascript application is useful'})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(1);
                done();
            })
    });

    it('no content param when create a new blog', function(done) {
        request
            .set('Sin-Access-Token', token)
            .send({title: newArticleTitle, views: 10})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(0);
                done();
            })
    });

    it('no title param when create a new blog should return status zero', function (done) {
        request
            .set('Sin-Access-Token', token)
            .send({content: 'test should be fail', love: 10})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(0);
                done();
            })
    });
});