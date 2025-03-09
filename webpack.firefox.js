import { merge } from 'webpack-merge';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common.js'

chrome_config = {
    output: {
        path: path.resolve(__dirname, 'build/firefox'),
        filename: '[name].js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/manifest/chrome.json', to: 'manifest.json'},
                {from: './src/popup.html', to: 'popup.html'},
                {from: './src/styles/output.css', to: 'output.css'},
                {from: './src/icons', to: 'icons'},
            ]
        })
    ]
}

module.exports = merge(common, chrome_config)