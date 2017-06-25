const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    devServer: {
        host: process.env.HOST,
        port: 7070,
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    devtool: 'source-map',
    performance: {
        hints: 'warning',
        maxEntrypointSize:500000,
        maxAssetSize:450000,
    },
    entry: {
        app: PATHS.app,
        vendor:['vue'],
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
        }),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};