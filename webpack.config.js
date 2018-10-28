const webpack = require('webpack')
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const SentryPlugin = require('webpack-sentry-plugin')

console.log('KEY!!!!!!!!!!!!!!!', process.env.SENTRY_KEY)
module.exports = {
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/i,
        loader: 'url-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new workboxPlugin.GenerateSW(),
    new webpack.HotModuleReplacementPlugin(),
    new SentryPlugin({
      organization: 'salty',
      project: 'salty-pwa',
      apiKey: process.env.SENTRY_KEY,
      release: process.env.GIT_SHA,
    }),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true,
    hot: true,
  },
}
