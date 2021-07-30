const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index: './src/index.js',
      tasks: './src/tasks.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '/src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'tasks.html',
            template: '/src/tasks.html',
            chunks: ['tasks'],
        })
    ],
};