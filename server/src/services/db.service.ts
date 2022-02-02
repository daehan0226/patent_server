import { MongoClient, ObjectId } from 'mongodb';
import db from "../configs/db.config";

const url = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/`
const database = db.database

export default class MongoSingleton {
    readonly collection;
    private static mongoClient: MongoClient;

    constructor(col: string) {
        this.collection= col;
    }

    static isInitialized(): boolean {
        return this.mongoClient !== undefined;
    }

    static async getClient(): Promise<MongoClient> {
        if (this.isInitialized()) return this.mongoClient;
        
        this.mongoClient = await MongoClient.connect(url);
        return this.mongoClient;
    }

    
    find = async (size:number, page:number, dates: {[key:string]: Date, }) => {
        try {
            const query = {
                "patent_date":
                    {
                        "$gte": dates.gdStartDate,
                        "$lt": dates.gdEndDate
                    }
            }
            const skipNumber = page > 0 ? ( ( page - 1 ) * size ) : 0 
            const client = await MongoSingleton.getClient()
            let collection = client.db(database).collection(this.collection);
            let result: any[] = []
            for await (let doc of collection.find(query).skip(skipNumber).limit(size)) {
                result.push(doc)
            }
            return result
        } catch (e) {
            return e;
        }
    }

    findById = async (_id:string) => {
        try {
            const client = await MongoSingleton.getClient()
            let collection = client.db(database).collection(this.collection);
            return await collection.findOne({"_id": new ObjectId(_id)});
        } catch (e) {
            return null;
        }
    }
}