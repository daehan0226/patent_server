import {agent as request} from 'supertest';
import app from "../../app"

describe('Get /patents', ()=> {
    it('상태 코드 200을 반환한다.', async ()=> {
        const res = await request(app).get('/patents');
        expect(res.status).toBe(200);
    });

    it('return given size number of patents', async ()=> {
        const size = 8
        const res = await request(app).get(`/patents?size=${size}`);
        expect(res.body).toHaveLength(size);
    });

    it('return default size number of patents when size is not provided', async ()=> {
        const res = await request(app).get(`/patents`);
        expect(res.body).toHaveLength(10);
    });
})


describe('Get /patents wrong params', ()=> {
    it('return 400 for wrong size type', async ()=> {
        const res = await request(app).get('/patents?size=size');
        expect(res.status).toBe(400);
    });
    
    it('return 400 for wrong page type', async ()=> {
        const res = await request(app).get('/patents?page=page');
        expect(res.status).toBe(400);
    });
    
    it('return 400 for wrong adStartDate', async ()=> {
        const res = await request(app).get('/patents?adStartDate=2022.12.21');
        expect(res.status).toBe(400);
    });
    
    it('return 400 for wrong adEndDate', async ()=> {
        const res = await request(app).get('/patents?adEndDate=2022.12.21');
        expect(res.status).toBe(400);
    });
    
    it('return 400 for wrong gdStartDate', async ()=> {
        const res = await request(app).get('/patents?gdStartDate=2022.12.21');
        expect(res.status).toBe(400);
    });
    
    it('return 400 for wrong gdEndDate', async ()=> {
        const res = await request(app).get('/patents?gdEndDate=2022.12.21');
        expect(res.status).toBe(400);
    });
})
