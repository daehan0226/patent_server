import * as dotenv from 'dotenv';
dotenv.config()

const env = process.env;
const db = {
    database: env.DB_NAME,
    collection: env.DB_COLLECTION,
    url: env.MONGODB_URL
};

module.exports = db;

export default db;