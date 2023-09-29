module.exports = {
    collectCoverage: false, // Qualquer teste gera um coverage
    testTimeout: 100000,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/*.contract.ts',
      '!<rootDir>/src/**/*.contracts.ts',
      '!<rootDir>/src/**/*.interface.ts',
      '!<rootDir>/src/**/*.decorator.ts',
      '!<rootDir>/src/**/*.feature.ts',
      '!<rootDir>/src/**/*.DTO.ts',
      '!<rootDir>/src/**/*.module.ts',
      '!<rootDir>/src/**/*.model.ts',
      '!<rootDir>/tests/@modules/mocks/*.ts',
      '!<rootDir>/src/@code-gen/*',
      '!<rootDir>/src/@config/*',
      '!<rootDir>/src/@types/*',
      '!<rootDir>/src/docs/*',
      '!<rootDir>/src/main.ts',
      '!<rootDir>/src/@modules/user/infra/services/strategies/**/*.ts'
    ], // Definir a partir de qual pasta gerar os testes
    coverageDirectory: 'coverage', // Gerar pasta separada de coverages
    coverageProvider: 'babel',
    maxWorkers: 1,
    clearMocks: true,
    moduleNameMapper: {
      '@/tests/(.+)': '<rootDir>/tests/$1',
      '@user/(.*)': '<rootDir>/src/user/$1',
      '@shared/(.*)': '<rootDir>/src/shared/$1'
    },
    testMatch: ['**/**.spec.ts'],
    modulePaths: [
      '<rootDir>',
      '/home/some/other/path'
    ],
    roots: [
      '<rootDir>/src',
      '<rootDir>/tests'
    ], // Onde fica o diretorio de testes
    transform: {
      '\\.ts$': 'ts-jest'
    },
    // coverageReporters: ['json', 'html'],
    moduleDirectories: ['node_modules', 'dirname'],
    coverageReporters: ['json', 'html']
  }
  