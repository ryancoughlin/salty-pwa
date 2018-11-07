const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
      ),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackPwaManifest({
      name: 'Salty',
      short_name: 'Salty',
      description: 'What is the tide doing?',
      background_color: '#ffffff',
      start_url: '/',
      ios: true,
      inject: true,
      icons: [
        {
          src: './src/assets/images/icon.png',
          sizes: [96, 128, 192, 256, 384, 512],
        },
        {
          src: './src/assets/images/icon.png',
          size: '1024x1024',
        },
      ],
    }),
  ],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
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
        sideEffects: true,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
