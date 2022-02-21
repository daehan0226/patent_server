import { createClient} from 'redis';
import config from '../../configs/redis.config';
import Logger from '../../middlewares/logger';
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

export default redisClient;