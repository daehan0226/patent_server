declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        APP_PORT?: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        DB_PORT: string;
        DB_COLLECTION: string;
      }
    }
}

export {}