import {agent as request} from 'supertest';
import moment from "moment";
import app from "../../app"
import MongoSingleton from '../../services/db.service';

const dbName = process.env.DB_NAME || "patent"
const collectionName = process.env.DB_COLLECTION || "patent"

describe('test endpoints after insert dummy patetns', ()=> {
    beforeAll(async () => {
        const db = new MongoSingleton(dbName, collectionName)
        const tempOne = [ ...Array(8).keys() ].map( i => {return{ patent_date: moment(`20210${i+2}0${i+1}`).toDate()}})
        const tempSecond = [ ...Array(7).keys() ].map( i => {return{ patent_date: moment(`20210${i+3}0${i+2}`).toDate()}})
        const patents = [...tempOne, ...tempSecond]
        const result = await db.insertMany(patents)
    });
    
    describe('Get /patents', ()=> {
        it('return 200', async ()=> {
            const res = await request(app).get('/patents?size=1');
            expect(res.status).toBe(200);
        });
    
        it('return given size number of patents', async ()=> {
            const size = 5
            const res = await request(app).get(`/patents?size=${size}`);
            expect(res.body).toHaveLength(size);
        });
        
        it('return default length for wrong size type', async ()=> {
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
            const db = new MongoSingleton(dbName, collectionName)
            const result = await db.insertMany([{"test":"Test"}])
            if (result) {
                const _id = result.insertedIds[0].toString()
                const res = await request(app).get(`/patents/${_id}`);
                expect(res.body).toHaveProperty("_id", _id);
            }
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

    
    describe('Get /patents?title', ()=> {
        it('return 400 for long string value(over 200)', async ()=> {
            const title = Array(201).join("a")
            const res = await request(app).get(`/patents?title=${title}`);
            expect(res.status).toBe(400);
        });
    })
    
    describe('Get /patents?desc', ()=> {
        it('return 400 for long string value(over 200)', async ()=> {
            const desc = Array(201).join("a")
            const res = await request(app).get(`/patents?desc=${desc}`);
            expect(res.status).toBe(400);
        });
    })
})