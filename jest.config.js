module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    '**/*.html',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
