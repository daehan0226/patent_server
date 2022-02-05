import { MongoClient, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import db from "../configs/db.config";

interface Idates {
    [key:string]: Date;
}

export default class MongoSingleton {
    private readonly db;
    readonly collection;
    private static mongoClient: MongoClient;

    constructor(db:string, col: string) {
        this.db=db;
        this.collection= col;
    }

    static isInitialized(): boolean {
        return this.mongoClient !== undefined;
    }

    static async getClient(): Promise<MongoClient> {
        if (this.isInitialized()) return this.mongoClient;

        if (process.env.NODE_ENV === "test") {
            const mongoServer =  await MongoMemoryServer.create()
            this.mongoClient = await MongoClient.connect(mongoServer.getUri())
        } else if (db.url) {
            this.mongoClient = await MongoClient.connect(db.url);
        } else {
            new Error('db connect error')
        }
        return this.mongoClient;
    }

    private genDateQuery(start:Date, end:Date) {
        return {
                "$gte": start, 
                "$lt": end
            }
    }

    public async getRandom(size:number, dates: {[key:string]: Date, }) {
        try {
            const query = {
                "patent_date": this.genDateQuery(dates.gdStartDate, dates.gdEndDate)
            }
            const client = await MongoSingleton.getClient()
            const collection = client.db(this.db).collection(this.collection);
            const result: any[] = []
            for await (let doc of collection.aggregate([{$match: query},{$sample: {size}}])) {
                result.push(doc)
            }
            return result
        } catch (e) {
            console.log(e)
            return [];
        }
    }
    
    public async find(size:number, page:number, dates: {[key:string]: Date, }) {
        try {
            const query = {
                "patent_date": this.genDateQuery(dates.gdStartDate, dates.gdEndDate)
            }
            const skipNumber = page > 0 ? ( ( page - 1 ) * size ) : 0 
            const client = await MongoSingleton.getClient()
            const collection = client.db(this.db).collection(this.collection);
            const result: any[] = []
            for await (let doc of collection.find(query).skip(skipNumber).limit(size)) {
                result.push(doc)
            }
            return result
        } catch (e) {
            console.log(e)
            return [];
        }
    }

    public async findById(_id:string) {
        try {
            const client = await MongoSingleton.getClient()
            const collection = client.db(this.db).collection(this.collection);
            return await collection.findOne({"_id": new ObjectId(_id)});
        } catch (e) {
            return null;
        }
    }
    
    public async insertMany(data:any) {
        try {
            const client = await MongoSingleton.getClient()
            const collection = client.db(this.db).collection(this.collection);
            const result = await collection.insertMany(data);
            return result
        } catch (e) {
            console.log(e)
            return null;
        }
    }
}