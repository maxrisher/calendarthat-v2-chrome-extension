import { merge } from 'webpack-merge';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common.js'
import { fileURLToPath } from 'url';

const file_path = fileURLToPath(import.meta.url)
const directory_name = path.dirname(file_path)

const chrome_config = {
    output: {
        path: path.resolve(directory_name, 'build/chrome'),
        filename: '[name].js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/manifest/chrome.json', to: 'manifest.json'},
                {from: './src/popup.html', to: 'popup.html'},
                {from: './src/styles/output.css', to: './styles/output.css'},
                {from: './src/icons', to: 'icons'},
            ]
        })
    ]
}

export default merge(commonConfig, chrome_config)