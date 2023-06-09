export default {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/server.ts", // this is file initial should not be covered
    "!<rootDir>/src/main/factories/**/*.ts", // this is file create instant should not be covered
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
    '@/tests/(.+)': '<rootDir>/tests/$1',
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests",
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '\\.ts$': 'ts-jest',
  },

  // setting up environment
  testEnvironment: 'node',

  // clear mocks after each test
  clearMocks: true,
};
