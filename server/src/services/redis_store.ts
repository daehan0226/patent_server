import { createClient } from 'redis';
import config from '../configs/redis.config';
import Logger from '../lib/logger';
import Patent from "../models/patent.model"

const redisClient = createClient({url: `redis://:${config.password}@${config.host}:${config.port}`});
redisClient.connect()
redisClient.on('error', (err) => {
    Logger.error("redisClient connection error")
});

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
        Logger.error("getCachedPatentCount error")
        return 1
    }
}


export default redisClient;