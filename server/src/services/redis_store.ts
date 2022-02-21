import { createClient} from 'redis';
import config from '../configs/redis.config';
import Logger from '../lib/logger';
import {Patent} from "../database"
import redis from "redis-mock"

let redisClient: any;
if (process.env.NODE_ENV === 'test') {
    redisClient = redis.createClient();
} else {
    const url = `redis://:${config.password}@${config.host}:${config.port}`
    Logger.info(`redis url : ${url}`)
    redisClient = createClient({url, legacyMode: true});
    redisClient.connect()
    redisClient.on('error', (e:string) => {
        Logger.error("redisClient connection error : ", e)
    });
}

export const getCachedPatentCount = async ():Promise<number> => {
    if(!redisClient.get('patent_count')) {
        const count = await Patent.countDocuments()
        redisClient.set('patent_count', count);
        return count
    } else {
        const count = await redisClient.get('patent_count');
        if (count) {
            const countInt = parseInt(count, 10)
            if (!isNaN(countInt)) {
                return countInt
            }
        }
        const newCount = await Patent.countDocuments()
        redisClient.set('patent_count', newCount);
        return newCount
    }
}


export default redisClient;