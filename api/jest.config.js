module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json'
        }
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts' ],
    coveragePathIgnorePatterns: ['/node_modules/', '/build/']
};
