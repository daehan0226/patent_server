import { agent as request } from 'supertest';
import app from '../../app';
import sequelize from '../../database/mysql';
import dbInit from '../../database/mysql/init';

describe('test user endpoints', () => {
    beforeAll(async () => {
        await sequelize.sync();
        await dbInit();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Post /users', () => {
        it('return 201 after creating a user', async () => {
            const name = 'test01';
            const password = 'aaSS11@@';
            const res = await request(app)
                .post('/users')
                .send({ name, password });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('name', name);
        });
        it('return 400 for a dupulicat name', async () => {
            const name = 'test02';
            const password = 'aaSS11@@';
            await request(app).post('/users').send({ name, password });
            const res = await request(app)
                .post('/users')
                .send({ name, password });
            expect(res.status).toBe(400);
        });
        it('return 400 for long name', async () => {
            const name = 'test12'.repeat(100);
            const password = 'aaSS11@@';
            const res = await request(app)
                .post('/users')
                .send({ name, password });
            expect(res.status).toBe(400);
        });
        it('has user role info', async () => {
            const name = 'test0123';
            const password = 'aaSS11@@';
            const res = await request(app)
                .post('/users')
                .send({ name, password });
            expect(res.body).toHaveProperty('roles');
        });
    });

    describe('Get /users/:id', () => {
        it('return 200 if user exists', async () => {
            const name = 'test03';
            const password = 'aaSS11@@';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const res = await request(app).get(`/users/${newUser.body.id}`);
            expect(res.status).toBe(200);
        });

        it('return 404 for user does not exist', async () => {
            const id = '182398134091';
            const res = await request(app).get(`/users/${id}`);
            expect(res.status).toBe(404);
        });
        it('has user role info', async () => {
            const name = 'test-0333';
            const password = 'aaSS11@@';
            const resNewUser = await request(app)
                .post('/users')
                .send({ name, password });
            const res = await request(app).get(`/users/${resNewUser.body.id}`);
            expect(res.body).toHaveProperty('roles');
        });
    });

    describe('Delete /users/:id', () => {
        it('return 404 if user does not exist', async () => {
            const id = '182398134091';
            const res = await request(app).delete(`/users/${id}`);
            expect(res.status).toBe(404);
        });
        it('return 204 after deleting a user', async () => {
            const name = 'test04';
            const password = 'aaSS11@@';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const res = await request(app).delete(`/users/${newUser.body.id}`);
            expect(res.status).toBe(204);
        });
        // 403 for no auth forbidden after adding session features
    });

    describe('update /users/:id', () => {
        it('return 200 if succeeds to change name', async () => {
            const name = 'test05';
            const password = 'aaSS11@@';
            const newName = 'test06';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const newUserWithNewName = await request(app)
                .put(`/users/${newUser.body.id}`)
                .send({ name: newName });
            expect(newUserWithNewName.body).toHaveProperty('name', newName);
        });
    });

    describe('get all users /users', () => {
        it('return 200 if succeeds to change name', async () => {
            const res = await request(app).get(`/users`);
            expect(res.status).toBe(200);
        });
    });

    describe('get user role /users', () => {
        it('has user role data', async () => {
            const name = 'test-role-1';
            const password = 'aaSS11@@';
            await request(app).post('/users').send({ name, password });
            const res = await request(app).get('/users');
            expect(res.body[0]).toHaveProperty('roles');
        });
    });
});
