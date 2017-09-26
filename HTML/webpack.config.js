'use strict';
let webpack = require('webpack');
let path = require('path');
let nodeModulesPath = path.join(__dirname, 'node_modules');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let exp = []; // multiple exports array


module.exports = function(env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    return {
        context: __dirname,
        watch: true,
        name: 'min',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'html/'),
            //pathinfo: true,
            filename: "js/app.js"
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: { minimize: true },
                    }],
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: { minimize: true },
                    },
                    {
                        loader: "sass-loader",
                        options: { minimize: true },
                    },
                    ],
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../',
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                    publicPath: '../',
                },
            }
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
            new ExtractTextPlugin({
                filename: 'css/app.css'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: { warnings: false }
            })
        ]
    }
}