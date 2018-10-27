const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

const dist = 'build'

const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.js',
  },
  plugins: [
    new cleanPlugin([dist]),
    new htmlPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new workboxPlugin.GenerateSW(),
  ],
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
  externals: {
    moment: 'moment',
    react: 'react',
  },
}
