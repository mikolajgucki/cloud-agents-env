export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: ['../index.html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  transform: {},
  setupFiles: ['./jest.setup.js']
};
