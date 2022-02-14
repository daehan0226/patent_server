export default {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

    roots: ["<rootDir>/src"],
    setupFiles: ["<rootDir>/jest/jest.setup.ts", "<rootDir>/jest/jest.setup.redis-mock.ts"],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};