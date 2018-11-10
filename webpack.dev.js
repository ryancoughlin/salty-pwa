const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    compress: true,
    noInfo: true,
    open: true,
  },
});
