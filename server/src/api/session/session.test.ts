import {agent as request} from 'supertest';
import app from "../../app"
import sequelize from '../../database/mysql';
import dbInit from "../../database/mysql/init"


describe('test session endpoints', ()=> {
    beforeAll(async () => {
        await sequelize.sync()
        await dbInit();
    })

    afterAll(async () => {
        await sequelize.close()
    })

    describe('Post /sessions', ()=> {
        it('return 201 with session token after validating user info', async ()=> {
            const name = 'test-session-01'
            const password = 'aA1!aA1!'
            await request(app).post('/users').send({name, password});
            const res = await request(app).post('/sessions').send({name, password});
            expect(res.status).toBe(201);
        });
        it('return 400 for wrong name/password', async ()=> {
            const name = 'test-session-02'
            const password = 'aA1!aA1!'
            await request(app).post('/users').send({name, password});
            const res = await request(app).post('/sessions').send({name, password: '1'});
            expect(res.status).toBe(400);
        });
    })
    
    describe('validate /sessions/validate', ()=> {
        it('return 200 if session cookie is valid', async ()=> {
            const name = 'test-session-03'
            const password = 'aA1!aA1!'
            await request(app).post('/users').send({name, password});
            const session = await request(app).post('/sessions').send({name, password});
            const res = await request(app).get('/sessions/validate').send().set('Cookie', session.headers["set-cookie"]);
            expect(res.status).toBe(200);
        });
        it('return 401 if session cookie is not valid', async ()=> {
            const res = await request(app).get('/sessions/validate').send().set('Cookie', 'random session id');
            expect(res.status).toBe(401);
        });
    })

    describe('delete /sessions', ()=> {
        it('return 204 if succeeds to destory session', async ()=> {
            const name = 'test-session-04'
            const password = 'aA1!aA1!'
            await request(app).post('/users').send({name, password});
            await request(app).post('/sessions').send({name, password});
            const res = await request(app).delete('/sessions')
            expect(res.status).toBe(204);
        });
    })
})