import { agent as request } from 'supertest';
import app from '../../app';
import { connect, disconnect } from '../../database/mongo/mongo.test';
import Patent from '../../database/mongo/patent';

describe('test endpoints after insert dummy patetns', () => {
    beforeAll(async () => {
        await connect();
        await genFakePatents();
    });

    afterAll(() => {
        Patent.deleteMany({});
        disconnect();
    });

    describe('Get /patents', () => {
        it('return 200', async () => {
            const res = await request(app).get('/patents?size=1');
            expect(res.status).toBe(200);
        });

        it('return given size number of patents', async () => {
            const size = 5;
            const res = await request(app).get(`/patents?size=${size}`);
            expect(res.body.patents).toHaveLength(size);
        });

        it('return default length for wrong size type', async () => {
            const defaultSize = 10;
            const size = 'as';
            const res = await request(app).get(`/patents?size=${size}`);
            expect(res.body.patents).toHaveLength(defaultSize);
        });

        it('return 200 for wrong page type(return with default page)', async () => {
            const page = 'sd';
            const res = await request(app).get(`/patents?size=1&page=${page}`);
            expect(res.status).toBe(200);
        });

        it('return default size number of patents when size is not provided', async () => {
            const res = await request(app).get(`/patents`);
            expect(res.body.patents).toHaveLength(10);
        });
    });

    describe('Get /patents/_id', () => {
        it('return patent by _id value', async () => {
            const newPatent = data;
            const newId = '10-2019-0053106';
            newPatent['_id'] = newId;
            const res = await Patent.insertMany([newPatent]);
            if (res) {
                const res = await request(app).get(`/patents/${newId}`);
                expect(res.body).toHaveProperty('_id', newId);
            }
        });
        it('retturn 404 for not found', async () => {
            const res = await request(app).get(`/patents/fakeidstring`);
            expect(res.status).toBe(404);
        });
    });

    describe('Get /patents/random', () => {
        it('return random patents', async () => {
            const res = await request(app).get('/patents/random?size=1');
            expect(res.status).toBe(200);
        });
    });

    describe('Get /patents?title', () => {
        it('return 400 for long string value(over 200)', async () => {
            const title = Array(201).join('a');
            const res = await request(app).get(`/patents?title=${title}`);
            expect(res.status).toBe(400);
        });
    });

    describe('Get /patents?desc', () => {
        it('return 400 for long string value(over 200)', async () => {
            const desc = Array(201).join('a');
            const res = await request(app).get(`/patents?desc=${desc}`);
            expect(res.status).toBe(400);
        });
    });
});

const data = {
    _id: '10-2019-0053105',
    application_date: '2019-05-07T00:00:00.000Z',
    title: '본딩형 발열 장치 및 그 제조 방법(a bonding type heating device and manufacturing method thereof)',
    applicant: '(주)온케어웰(경상남도 진주시...)',
    ipc_original: 'A61F 7/02(2006.01)|A61F 7/00(2006.01)|A61N 5/06(2006.01)',
    cpc_original:
        'A61F 7/02(2013.01)|A61F 7/007(2013.01)|A61N 5/0625(2013.01)|A61F 2007/0098(2013.01)|A61F 2007/0086(2013.01)|A61F 2007/0225(2013.01)|A61F 2007/0022(2013.01)|A61F 2007/005(2013.01)|A61F 2007/0088(2013.01)|A61N 2005/0659(2013.01)|A61N 2005/0643(2013.01)',
    patent_number: '10-2200544-0000',
    patent_date: '2021-01-04T00:00:00.000Z',
    legal_status: '등록',
    abstract:
        '발열 장치가 개시된다. 본 발명의 일 실시 예에 따른 발열 장치는 제1 기판, 상기 제1 기판 상에 형성되고, 열원을 포함하는 제2 기판, 상기 제2 기판의 일단에 마련되어 제2 기판에 전력을 공급하는 전원단자부 및 상기 제2 기판이 형성된 제1 기판 상에 형성되는 제3 기판을 포함하고, 상기 제1 기판 및 제3 기판은 연성 소재로 구성되며, 상기 제1 기판, 제2 기판 및 제3 기판은 서로 접착제를 통해 접착된다.',
    claim: '[청구항 1]제1 기판;상기 제1 기판 상에 형성되고, 열원을 포함하는 제2 기판;상기 제2 기판의 일단에 마련되어 제2 기판에 전력을 공급하는 전원단자부; 및상기 제2 기판이 형성된 제1 기판 상에 형성되는 제3 기판을 포함하고,상기 제1 기판 및 제3 기판은 연성 소재로 구성되며, 상기 제1 기판, 제2 기판 및 제3 기판은 서로 접착제를 통해 접착되며,상기 전원단자부는 상기 제2 기판의 일 측면에 고정되어 마련되는 제1 전원단자부와, 상기 제2 기판과 연결부재를 통해 연결되는 제2 전원단자부와, 상기 제1 전원단자와 제2 전원단자를 전기적으로 연결하고 형상 변형이 가능한 소재로 구성되는 완충부를 포함함을 특징으로 하는 발열 장치.\n[청구항 2]제1 항에 있어서,.',
};

export const genFakePatents = async () => {
    const patents = [...Array(100).keys()].map((i) => {
        data['_id'] = '110-2019-00531'.concat(i.toString());
        return { ...data };
    }); // need to find a better way
    await Patent.insertMany(patents);
};
