import {agent as request} from 'supertest';
import app from "../../app"

describe('Get /patents', ()=> {
    it('return 200', async ()=> {
        const res = await request(app).get('/patents');
        expect(res.status).toBe(200);
    });

    it('return given size number of patents', async ()=> {
        const size = 8
        const res = await request(app).get(`/patents?size=${size}`);
        expect(res.body).toHaveLength(size);
    });
    
    it('return 400 for wrong size type', async ()=> {
        const size = 'as'
        const res = await request(app).get(`/patents?size=${size}`);
        expect(res.status).toBe(400);
    });

    it('return 400 for wrong page type', async ()=> {
        const page = 'sd'
        const res = await request(app).get(`/patents?page=${page}`);
        expect(res.status).toBe(400);
    });

    it('return default size number of patents when size is not provided', async ()=> {
        const res = await request(app).get(`/patents`);
        expect(res.body).toHaveLength(10);
    });
})


describe('Get /patents/_id', ()=> {
    it('return patent by _id value', async ()=> {
        const _id = "61e95f1c1c9de498fdab2998"
        const res = await request(app).get(`/patents/${_id}`);
        expect(res.body).toHaveProperty("_id", _id);
    });
    it('retturn 404 for not found', async ()=> {
        const res = await request(app).get(`/patents/fakeidstring`);
        expect(res.status).toBe(404);
    });
})