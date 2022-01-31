import 'mocha';
import {agent as request} from 'supertest';
import app from "../../"
import {expect} from 'chai';

describe('성공시', ()=> {
    it('상태 코드 200을 반환한다.', async ()=> {
        const res = await request(app).get('/patents');
        expect(res.status).to.equal(200);
    });
})