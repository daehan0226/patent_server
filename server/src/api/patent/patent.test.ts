import {agent as request} from 'supertest';
import app from "../../app"

describe('Get /patents', ()=> {
    it('return 200', async ()=> {
        const res = await request(app).get('/patents?size=1');
        expect(res.status).toBe(200);
    });

    it('return given size number of patents', async ()=> {
        const size = 8
        const res = await request(app).get(`/patents?size=${size}`);
        expect(res.body).toHaveLength(size);
    });
    
    it('return default lenth for wrong size type', async ()=> {
        const defaultSize= 10;
        const size = 'as'
        const res = await request(app).get(`/patents?size=${size}`);
        expect(res.body).toHaveLength(defaultSize);
    });

    it('return 200 for wrong page type(return with default page)', async ()=> {
        const page = 'sd'
        const res = await request(app).get(`/patents?size=1&page=${page}`);
        expect(res.status).toBe(200);
    });

    it('return default size number of patents when size is not provided', async ()=> {
        const res = await request(app).get(`/patents`);
        expect(res.body).toHaveLength(10);
    });
})


describe('Get /patents/_id', ()=> {
    it('return patent by _id value', async ()=> {
        const _id = "61fe1a3fcee8c6a943c6ec16"
        const res = await request(app).get(`/patents/${_id}`);
        expect(res.body).toHaveProperty("_id", _id);
    });
    it('retturn 404 for not found', async ()=> {
        const res = await request(app).get(`/patents/fakeidstring`);
        expect(res.status).toBe(404);
    });
})

describe('Get /patents/random', ()=> {
    it('return random patents', async ()=> {
        const res = await request(app).get('/patents/random?size=1');
        expect(res.status).toBe(200);
    });
})