declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        EXPRESS_PORT: string;
        MONGODB_URL: string;
        MONGO_DATABASE: string;
        REDIS: string;
        REDIS_PORT: string;
        REDIS_PASSWORD: string;
      }
    }
}

export {}