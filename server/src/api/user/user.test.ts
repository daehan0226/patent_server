import {agent as request} from 'supertest';
import app from "../../app"
import sequelize from '../../models/mysql';
import dbInit from "../../models/mysql/init"


describe('test user endpoints', ()=> {
    beforeAll(async () => {
        await sequelize.sync()
        await dbInit();
    })

    afterAll(async () => {
        await sequelize.close()
    })

    describe('Post /users', ()=> {
        it('return 201 after creating a user', async ()=> {
            const name = 'test01'
            const res = await request(app).post('/users').send({name});
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("name", name);
        });
        it('return 400 for a dupulicat name', async ()=> {
            const name = 'test02'
            await request(app).post('/users').send({name});
            const res = await request(app).post('/users').send({name});
            expect(res.status).toBe(400);
        });
    })

    
    describe('Get /users/:id', ()=> {
        it('return 200 if user exists', async ()=> {
            const name = 'test03'
            const response = await request(app).post('/users').send({name});
            const res = await request(app).get(`/users/${response.body.id}`);
            expect(res.status).toBe(200);
        });
        it('return 404 for user does not exist', async ()=> {
            const id = '182398134091'
            const res = await request(app).get(`/users/${id}`);
            expect(res.status).toBe(404);
        });
    })
})
