import { agent as request } from 'supertest';
import app from '../../app';
import sequelize from '../../database/mysql';
import dbInit from '../../database/mysql/init';
import Role from '../../database/mysql/role';
import User from '../../database/mysql/user';
import UserRole from '../../database/mysql/userRole';

describe('test user endpoints', () => {
    let adminUserCookie: any;
    beforeAll(async () => {
        await sequelize.sync();
        await dbInit();
        adminUserCookie = await getAdminUserCookie();
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
        it('return 400 for a duplicate name', async () => {
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
        it('return 403 for no permission', async () => {
            const name = 'test-delete-01';
            const password = 'aaSS11@@';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const res = await request(app).delete(`/users/${newUser.body.id}`);
            expect(res.status).toBe(403);
        });
        it('return 204 after deleting a user', async () => {
            const name = 'test04';
            const password = 'aaSS11@@';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const res = await request(app)
                .delete(`/users/${newUser.body.id}`)
                .set('Cookie', adminUserCookie);
            expect(res.status).toBe(204);
        });

        it('return 404 when trying to delete non existing user', async () => {
            const res = await request(app)
                .delete(`/users/9999999999999999999`)
                .set('Cookie', adminUserCookie);
            expect(res.status).toBe(404);
        });
    });

    describe('update /users/:id', () => {
        it('return 204 if succeeds to change name', async () => {
            const name = 'test05';
            const password = 'aaSS11@@';
            const newName = 'test06';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const session = await request(app)
                .post('/sessions')
                .send({ name, password });
            const newUserWithNewName = await request(app)
                .put(`/users/${newUser.body.id}`)
                .send({ name: newName })
                .set('Cookie', session.headers['set-cookie']);
            expect(newUserWithNewName.status).toBe(204);
        });
        it('return 204 changing name by admin', async () => {
            const name = 'test-update-by-admin';
            const password = 'aaSS11@@';
            const newName = 'test-update-by-admin-new-name';
            const newUser = await request(app)
                .post('/users')
                .send({ name, password });
            const newUserWithNewName = await request(app)
                .put(`/users/${newUser.body.id}`)
                .send({ name: newName })
                .set('Cookie', adminUserCookie);
            expect(newUserWithNewName.status).toBe(204);
        });
        it('return 403 if not owner(different user"s session cookie', async () => {
            const name = 'test07';
            const anothername = 'test07';
            const password = 'aaSS11@@';
            const newName = 'test06';
            await request(app).post('/users').send({ name, password });
            const session = await request(app)
                .post('/sessions')
                .send({ name, password });

            const anotherUser = await request(app)
                .post('/users')
                .send({ name: anothername, password });

            const res = await request(app)
                .put(`/users/${anotherUser.body.id}`)
                .send({ name: newName })
                .set('Cookie', session.headers['set-cookie']);
            expect(res.status).toBe(403);
        });
    });

    describe('/users', () => {
        it('return 200 admin get all users', async () => {
            const res = await request(app)
                .get(`/users`)
                .set('Cookie', adminUserCookie);
            expect(res.status).toBe(200);
        });
        it('return 403 general user trying to get all users', async () => {
            const res = await request(app).get(`/users`);
            expect(res.status).toBe(403);
        });
    });

    describe('get user role /users', () => {
        it('has user role data', async () => {
            const name = 'test-role-1';
            const password = 'aaSS11@@';
            await request(app).post('/users').send({ name, password });
            const res = await request(app)
                .get('/users')
                .set('Cookie', adminUserCookie);
            expect(res.body[0]).toHaveProperty('roles');
        });
    });
});

const getAdminUserCookie = async () => {
    const name = 'test-admin';
    const password = 'asdfQWER!@#$1234';
    const user = await User.create({ name, password });
    const userId = user.id;
    const adminRole = await Role.findOne({
        where: { name: 'admin' },
    });
    if (adminRole) {
        await UserRole.create({
            userId,
            roleId: adminRole.id,
        });
    }

    const session = await request(app)
        .post('/sessions')
        .send({ name, password });

    return session.headers['set-cookie'];
};
