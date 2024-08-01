const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { library } = require('webpack')

module.exports = merge(baseConfig, {
  target: 'node', // webpack5通过target支持node模块 https://webpack.js.org/concepts/targets/
  entry: './src/server/index.jsx',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
    // https://webpack.docschina.org/configuration/output#outputlibrarytype
    library: {
      type: 'commonjs',
    },
  },
})
