import { merge } from 'webpack-merge';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common.js'
import { fileURLToPath } from 'url';

const file_path = fileURLToPath(import.meta.url)
const directory_name = path.dirname(file_path)

const firefox_config = {
    output: {
        path: path.resolve(directory_name, 'build/firefox'),
        filename: '[name].js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/manifest/firefox.json', to: 'manifest.json'},
                {from: './src/popup.html', to: 'popup.html'},
                {from: './src/styles/output.css', to: './styles/output.css'},
                {from: './src/icons', to: 'icons'},
            ]
        })
    ],
    optimization: {
        minimize: false
    },
}

export default merge(commonConfig, firefox_config)