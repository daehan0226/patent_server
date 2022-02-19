import * as dotenv from 'dotenv';

dotenv.config()

let MYSQL_URL = process.env.MYSQL_URL || '';

if (!MYSQL_URL || process.env.NODE_ENV === "test") {
    MYSQL_URL = 'sqlite::memory:'
}

const mysqlConfig = {
    url: MYSQL_URL,
};
export default mysqlConfig;