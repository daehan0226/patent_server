
import { MongoClient, ObjectId } from 'mongodb';
import db from "../configs/db.config";

const url = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/`
const database = db.database
const conllection = db.collection || "patent"

class MongoSingleton {
    private static mongoClient: MongoClient;

    static isInitialized(): boolean {
        return this.mongoClient !== undefined;
    }

    static async getClient(): Promise<MongoClient> {
        if (this.isInitialized()) return this.mongoClient;
        
        this.mongoClient = await MongoClient.connect(url);
        return this.mongoClient;
    }
}

const findOne = async (size:number) => {
    try {
        const client = await MongoSingleton.getClient()
        const db = client.db(database);
        let collection = db.collection(conllection);
        return await collection.findOne({});
    } catch (e) {
        return e;
    }
}

const findById = async (_id:string) => {
    try {
        const client = await MongoSingleton.getClient()
        const db = client.db(database);
        let collection = db.collection(conllection);
        return await collection.findOne({"_id": new ObjectId(_id)});
    } catch (e) {
        return e;
    }
}

export {
    findOne,
    findById
}