declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        EXPRESS_PORT: string;
        MONGODB_URL: string;
        MONGO_DATABASE: string;
      }
    }
}

export {}