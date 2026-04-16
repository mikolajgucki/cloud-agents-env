module.exports = {
    testEnvironment: 'node',
    transformIgnorePatterns: [
        'node_modules/(?!(@exodus/bytes|html-encoding-sniffer)/)'
    ],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ]
};
