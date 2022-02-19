import {agent as request} from 'supertest';
import app from "../../app"


describe('test user endpoints', ()=> {
    beforeAll(async () => {
    })
    
    afterAll(() => {
    })

    describe('Post /users', ()=> {
        it.only('return 200', async ()=> {
            const res = await request(app).post('/users');
            console.log(res)
            expect(res.status).toBe(200);
        });
    
    })
})
