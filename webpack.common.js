import path from 'path';

module.exports = {
    mode: process.env.NODE_ENV || 'development',

    entry: {
        background_listeners: './src/background_listeners.js', // moves this file
        popup: './src/popup.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
}