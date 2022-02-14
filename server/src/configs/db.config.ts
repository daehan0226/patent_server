import * as dotenv from 'dotenv';

dotenv.config()

const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/";

const db = {
    database: MONGO_DATABASE,
    url: MONGODB_URL
};
export default db;