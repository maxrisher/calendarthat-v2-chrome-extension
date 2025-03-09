import path from 'path';

export default {
    mode: process.env.NODE_ENV || 'production', // production here ensures that the files created in the chrome extension are in full. they do not simply point back to the original files

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