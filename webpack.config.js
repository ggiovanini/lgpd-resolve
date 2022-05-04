const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'lgpd-bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
