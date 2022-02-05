declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        APP_PORT?: string;
        DB_NAME: string;
        DB_COLLECTION: string;
        MONGODB_URL: string;
      }
    }
}

export {}