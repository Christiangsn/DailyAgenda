module.exports = {
    moduleNameMapper: {
      '@/tests/(.+)': '<rootDir>/tests/@integration/$1'
    },
    testTimeout: 100000,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.resolver.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/docs/**',
      '!<rootDir>/src/@config/**',
      '!**/test/**'
    ],
    coverageDirectory: 'coverage-integrations',
    testEnvironment: 'node',
    maxWorkers: 1,
    clearMocks: true,
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    testRegex: ['.+\\.test\\.ts$'],
    transformIgnorePatterns: ['node_modules/(?!axios)'],
    modulePaths: [
      '<rootDir>',
      '/home/some/other/path'
    ],
    coverageReporters: ['json', 'html'],
    roots: [
      '<rootDir>/src',
      '<rootDir>/tests'
    ],
    moduleDirectories: ['node_modules', 'dirname']
  }
  