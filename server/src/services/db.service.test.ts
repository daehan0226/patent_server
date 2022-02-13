import { MongoClient } from 'mongodb';
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

  await mongoose.connect(uri, {autoIndex: true});
};

export const disconnect = async () => {
  await mongoose.connection.close();
  await mongod.stop();
};


describe('Single MongoMemoryServer', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should successfully set & get information from the database', async () => {
    const db = con.db(mongoServer.instanceInfo!.dbName);

    expect(db).toBeDefined();
    const col = db.collection('test');
    const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
    expect(result.insertedCount).toStrictEqual(2);
    expect(await col.countDocuments({})).toBe(2);
  });
});