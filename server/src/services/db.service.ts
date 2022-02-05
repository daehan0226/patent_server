import { MongoClient, ObjectId } from 'mongodb';
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
        
        if (db.url) {
            this.mongoClient = await MongoClient.connect(db.url);
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
            let collection = client.db(this.db).collection(this.collection);
            let result: any[] = []
            for await (let doc of collection.aggregate([{$match: query},{$sample: {size}}])) {
                result.push(doc)
            }
            return result
        } catch (e) {
            return e;
        }
    }
    
    public async find(size:number, page:number, dates: {[key:string]: Date, }) {
        try {
            const query = {
                "patent_date": this.genDateQuery(dates.gdStartDate, dates.gdEndDate)
            }
            const skipNumber = page > 0 ? ( ( page - 1 ) * size ) : 0 
            const client = await MongoSingleton.getClient()
            let collection = client.db(this.db).collection(this.collection);
            let result: any[] = []
            for await (let doc of collection.find(query).skip(skipNumber).limit(size)) {
                result.push(doc)
            }
            return result
        } catch (e) {
            return e;
        }
    }

    public async findById(_id:string) {
        try {
            const client = await MongoSingleton.getClient()
            let collection = client.db(this.db).collection(this.collection);
            return await collection.findOne({"_id": new ObjectId(_id)});
        } catch (e) {
            return null;
        }
    }
}