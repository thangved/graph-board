const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, path.resolve('./dist'))
    },
}