const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: ['babel-polyfill', './src/index'],
  devServer: {
    port: 8000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
});
