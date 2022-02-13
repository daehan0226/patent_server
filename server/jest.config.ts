export default {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

    roots: ["<rootDir>/src"],
    setupFiles: ["<rootDir>/jest/setEnvVars.ts"],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};