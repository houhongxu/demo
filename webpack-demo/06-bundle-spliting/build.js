const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'bundlesplit',
  entry: path.resolve(__dirname, './index.js'),
  mode: 'none',
  output: {
    filename: '[name].[contenthash:6].js', // main的模块id为0
    chunkFilename: '[name].chunk.[contenthash:6].js', // [name]默认是[id]
    iife: false,
    pathinfo: 'verbose',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      minChunks: 2, // 2个共享就进行拆包
      minSize: 0,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
}

const bundlesplit = () => {
  return webpack(config)
}

bundlesplit().run((err, stats) => {
  console.log(err ?? '---bundle-split---done---')
})

exports.config = config
