const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('Ops Admin Test', function() {
    let request;

    beforeEach(function() {
        request = supertest(app)
            .post('/admin/login')
            .set('Accept', 'application/json')
    });

    it('correct userName and correct password', function(done) {
        request.send({userName: 'admin', password: 'admin'})
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                if (response.status == 1) {
                    done();
                }
            })
    });

    it('unexist user should status equal 0', function(done) {
        request.send({userName: 'admin3', password: 'admin3'})
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(0);
                done();
            })
    });

    it('wrong password should status equal 0', function(done) {
        request.send({userName: 'admin', password: 'admin1'})
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw new Error(err);
                }
                let response = JSON.parse(res.text);
                expect(response).to.have.property('status').and.to.equal(0);
                done();
            })
    });
});