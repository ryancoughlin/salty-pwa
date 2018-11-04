const webpack = require('webpack')
const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
      ),
    }),
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
