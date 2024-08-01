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
  optimization: {
    // ! 在生产环境下，二者将被 webpack 默认配置为 deterministic，但是配置后id不变了，main却还在因为chunk改变后改变hash而随着改变，所以需要配置runtimeChunk
    moduleIds: 'deterministic', // ! 影响模块顺序
    chunkIds: 'deterministic', // ! 影响chunk名称里的id，所以也main中的读取chunk的路径
    runtimeChunk: true, // ! 分类webpack运行时代码，让main可以缓存
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
}

const hash = () => {
  return webpack(config)
}

hash().run((err, stats) => {
  console.log(err ?? '---hash---done---')
})

exports.config = config
