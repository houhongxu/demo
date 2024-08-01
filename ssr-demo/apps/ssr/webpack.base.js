const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic', // react17+配置后不需要引入react即可使用jsx
              },
            ],
            ['@babel/preset-env'],
          ],
        },
      },
    ],
  },
}
