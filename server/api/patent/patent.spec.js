const request = require('supertest');
const should = require('should');
const app = require('../../');

describe('성공시', ()=> {
    it('특허 객체를 담은 배열로 응답한다 ', (done)=> {
        request(app)
            .get('/patents')
            .end((err, res) => {
            res.body.should.be.instanceOf(Array);
            done();
            });
    })
})