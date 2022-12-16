const Dotenv = require('dotenv-webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js',
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({
        path: './.env',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }
}
