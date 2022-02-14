import * as dotenv from 'dotenv';

dotenv.config()

const REDIS = process.env.REDIS || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

const config = {
    host: REDIS,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
};
export default config;