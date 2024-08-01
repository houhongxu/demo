const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'codesplit',
  entry: path.resolve(__dirname, './index.js'),
  mode: 'none',
  output: {
    filename: '[id].[name].[contenthash:6].js', // main的模块id为0
    chunkFilename: '[name].chunk.[contenthash:6].js', // [name]默认是[id]
    iife: false,
    pathinfo: 'verbose',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    chunkLoading: 'import', // 默认为'jsonp'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
}

const codesplit = () => {
  return webpack(config)
}

codesplit().run((err, stats) => {
  console.log(err ?? '---code-spliting---done---')
})

exports.config = config
