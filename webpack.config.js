const webpack = require('webpack')
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new workboxPlugin.GenerateSW(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
  externals: {
    moment: 'moment',
    react: 'react',
  },
}
