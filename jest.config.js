/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: './src/',
  moduleNameMapper: {
    "@Api/(.*)": "<rootDir>/api/$1",
    "@Common/(.*)": "<rootDir>/common/$1",
    "@Config/(.*)": "<rootDir>/common/config/$1",
    "@ControllerPattern/(.*)": "<rootDir>/common/system/controller-pattern/$1",
    "@Entities/(.*)": "<rootDir>/common/ressources/$1",
    "@Entries/(.*)": "<rootDir>/entries/$1",
    "@Repositories/(.*)": "<rootDir>/common/repositories/$1",
    "@RpcGateway/(.*)": "<rootDir>/rpc-gateway/$1",
    "@Services/(.*)": "<rootDir>/common/services/$1",
    "@System/(.*)": "<rootDir>/common/system/$1",
    "@Tests/(.*)": "<rootDir>/tests/$1",
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
