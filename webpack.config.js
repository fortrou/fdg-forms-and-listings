const path = require('path');

module.exports = {
    entry: './assets/jssrc/index.js',
    output: {
        path: path.resolve(__dirname, 'assets/build/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        issuer: /\.[jt]sx?$/,
                        resourceQuery: /react/, // usage: import icon from './icon.svg?react'
                        use: ['@svgr/webpack']
                    },
                    {
                        type: 'asset/resource'
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development'
};
