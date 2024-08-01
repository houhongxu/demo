const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'pre',
  entry: path.resolve(__dirname, './index.js'),
  mode: 'none',
  output: {
    filename: '[id].main.[contenthash:6].js',
    chunkFilename: '[id].[name].chunk.[contenthash:6].js',
    iife: false,
    clean: true,
    pathinfo: 'verbose',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
}

const pre = () => {
  return webpack(config)
}

pre().run((err, stats) => {
  console.log(err ?? '---pre---done---')
})

exports.config = config
