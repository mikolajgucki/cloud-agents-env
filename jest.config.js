module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/app/'
  ],
  collectCoverageFrom: [
    '**/*.html'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/app/'
  ]
};
