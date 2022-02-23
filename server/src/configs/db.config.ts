import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGODB_URL = process.env.MONGODB_URL || '';
let MYSQL_URL = process.env.MYSQL_URL || '';

if (!MYSQL_URL || process.env.NODE_ENV === 'test') {
    MYSQL_URL = 'sqlite::memory:';
}

const db = {
    mongoUrl: MONGODB_URL,
    mongoDB: MONGO_DATABASE,
    mysqlUrl: MYSQL_URL,
};
export default db;
