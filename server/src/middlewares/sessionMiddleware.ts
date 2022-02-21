import session from 'express-session'
import connectRedis  from 'connect-redis'
import redisClient from '../services/redis_store';

const RedisStore = connectRedis(session)

const sessionInfo = {
   resave: false,
   saveUninitialized: false,
   secret: "sessionSecret",
   name: 'sessionId',
   cookie: {
      httpOnly: true,
      secure: false,
   },
   store: new RedisStore({ client: redisClient })
}

export interface ISessionUser {
      id: number;
      name: string;
}

export default session(sessionInfo);