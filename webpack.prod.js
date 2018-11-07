const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const DotEnv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new DotEnv({
      systemvars: true,
    }),
  ],
})
