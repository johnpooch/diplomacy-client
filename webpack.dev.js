const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8020,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
});
