module.exports = {
    testTimeout: 100000,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.resolver.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/docs/**',
      '!<rootDir>/src/@config/**',
      '!**/test/**'
    ],
    clearMocks: true,
    moduleNameMapper: {
      '@/tests/(.+)': '<rootDir>/tests/e2e/$1',
      '@user/(.*)': '<rootDir>/src/user/$1',
      '@shared/(.*)': '<rootDir>/src/shared/$1',
      '@config/(.*)': '<rootDir>/src/config/$1'
    },
    coverageDirectory: 'coverage-integrations',
    testEnvironment: 'node',
    maxWorkers: 1,
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
  