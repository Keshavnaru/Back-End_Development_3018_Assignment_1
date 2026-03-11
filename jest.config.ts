export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.tests.ts"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts"
    ]
};