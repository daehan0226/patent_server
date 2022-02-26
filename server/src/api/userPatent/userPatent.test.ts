import { agent as request } from 'supertest';
import app from '../../app';
import { connect, disconnect } from '../../database/mongo/mongo.test';
import sequelize from '../../database/mysql';
import dbInit from '../../database/mysql/init';
import { genFakePatents } from '../patent/patent.test';

describe('test user patent endpoints', () => {
    beforeAll(async () => {
        await sequelize.sync();
        await dbInit();
        await connect();
        await genFakePatents();
    });

    afterAll(async () => {
        await sequelize.close();
        await disconnect();
    });

    describe('Post /users/patents', () => {
        let userId: number;
        let cookie: any;

        beforeAll(async () => {
            ({ userId, cookie } = await createTestUser());
        });
        it('return 201 after creating a user"s patent', async () => {
            const patent = await request(app).get('/patents/random');
            const createUserPatentRes = await request(app)
                .post(`/users/${userId}/patents`)
                .send({ patentId: patent.body._id })
                .set('Cookie', cookie);
            expect(createUserPatentRes.status).toBe(201);
        });
        it('return list of patent id after creating a user"s patent', async () => {
            const patent = await request(app).get('/patents/random');
            await request(app)
                .post(`/users/${userId}/patents`)
                .send({ patentId: patent.body._id })
                .set('Cookie', cookie);

            const res = await request(app)
                .get(`/users/${userId}/patents`)
                .set('Cookie', cookie);
            expect(res.body).toContain(patent.body._id);
        });
        it('return 204 after remove user"s patent', async () => {
            const patent = await request(app).get('/patents/random');
            await request(app)
                .post(`/users/${userId}/patents`)
                .send({ patentId: patent.body._id })
                .set('Cookie', cookie);

            const res = await request(app)
                .delete(`/users/${userId}/patents/${patent.body._id}`)
                .set('Cookie', cookie);
            expect(res.status).toBe(204);
        });
        it('does not have the patent after remove user"s patent', async () => {
            const patent = await request(app).get('/patents/random');
            await request(app)
                .post(`/users/${userId}/patents`)
                .send({ patentId: patent.body._id })
                .set('Cookie', cookie);
            await request(app)
                .delete(`/users/${userId}/patents/${patent.body._id}`)
                .set('Cookie', cookie);
            const res = await request(app)
                .get(`/users/${userId}/patents`)
                .set('Cookie', cookie);
            expect(res.status).not.toContain(patent.body._id);
        });
        it('return 403 for no permission', async () => {
            const patent = await request(app).get('/patents/random');
            const name = 'test-user-patent-02';
            const password = 'aaSS11@@';
            const createUserRes = await request(app)
                .post('/users')
                .send({ name, password });
            const newUserId = createUserRes.body.id;
            const res = await request(app)
                .post(`/users/${newUserId}/patents`)
                .send({ patentId: patent.body._id })
                .set('Cookie', cookie);
            expect(res.status).toBe(403);
        });
        it('return 401 if without cookie', async () => {
            const patent = await request(app).get('/patents/random');
            const res = await request(app)
                .post(`/users/${userId}/patents`)
                .send({ patentId: patent.body._id });
            expect(res.status).toBe(401);
        });
    });
});

const createTestUser = async () => {
    const name = 'test-user-patent-01';
    const password = 'aaSS11@@';
    const createUserRes = await request(app)
        .post('/users')
        .send({ name, password });

    const session = await request(app)
        .post('/sessions')
        .send({ name, password });

    return {
        userId: createUserRes.body.id,
        cookie: session.headers['set-cookie'],
    };
};
