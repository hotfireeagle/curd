const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

// TODO: 在测试过程中，会测试新增的操作，但是测试过程中最好不要加入无效数据，所以在新增之后最好在将其进行删除
describe('blog module test', function() {
    let request, token;
    let newArticleTitle = 'from mocha run npm test';
    let articleId;

    // 顺便在这里测试获取文章的接口（什么参数都不传）
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

            let idRes = await supertest(app)
                .post('/blog/blogs')
                .set('Accept', 'application/json')
                .expect(200);
            let idResponse = JSON.parse(idRes.text);
            expect(idResponse).to.have.property('status').and.to.equal(1);
            expect(idResponse).to.have.property('data').and.to.be.an('array');
            articleId = idResponse['data'][0]['_id'];
        } catch(err) {
            throw new Error(err);
        }
    });

    /** 在这里执行删除操作，因为在新增的时候统一都是新增的标题为newArticleTitle，所以在完成该测试用例之后直接将这个标题的删除即可 */
    after(async function() {
        try {
            let res = await supertest(app)
                .get(`/blog/deleteByTitle?title=${newArticleTitle}`)
                .set('Sin-Access-Token', token)
                .set('Accept', 'application/json')
                .expect(200);
            let response = JSON.parse(res.text);
            expect(response).to.have.property('status').and.to.equal(1);
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

    it('delete a article with the correct _id should be ok', function(done) {
        supertest(app)
            .get('/blog/delete?id=5c2cc6e4b0958e0bd9e42cd2')
            .set('Sin-Access-Token', token)
            .set('Accept', 'application/json')
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

    it('delete a article but without token should be error', function(done) {
        supertest(app)
            .get('/blog/delete?id=5c2cc6e4b0958e0bd9e42cd2')
            .set('Accept', 'application/json')
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

    /** 测试能否更新，但是对于更新操作来说，是使用文章的_id来标识文章的，所以这里先要调取一下获取文章id的方法 */
    it('update the article with the right params should be ok', function(done) {
        supertest(app)
            .post('/blog/update')
            .set('Sin-Access-Token', token)
            .set('Accept', 'application/json')
            .send({ id: articleId, title: newArticleTitle })
            .end((err, res) => {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(1);
                done();
            })
    });
});