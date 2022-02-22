import { MongoMemoryServer } from 'mongodb-memory-server'; // https://github.com/nodkz/mongodb-memory-server
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const connect = async () => {
    mongod = await MongoMemoryServer.create({
        binary: {
            version: '5.0.1',
        },
    });
    const uri = mongod.getUri();

    await mongoose.connect(uri);
};

export const disconnect = async () => {
    await mongoose.connection.close();
    await mongod.stop();
};

describe('Single MongoMemoryServer', () => {
    beforeAll(() => connect());

    afterAll(() => disconnect());

    it('connect mongodb memory server', async () => {
        expect(mongod).toBeInstanceOf(MongoMemoryServer);
        expect(mongod.getUri()).toContain('mongodb://127.0.0.1');
    });
});
