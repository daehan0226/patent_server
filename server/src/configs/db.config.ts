import * as dotenv from 'dotenv';

dotenv.config()

const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGO_COLLECTION = process.env.MONGO_COLLECTION || '';
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/";

const db = {
    database: MONGO_DATABASE,
    collection: MONGO_COLLECTION,
    url: MONGODB_URL
};
export default db;