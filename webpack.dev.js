const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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

    disableHostCheck: true, // Must be disabled for ngrok to work properly
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
  output: {
    publicPath: '/',
  },
  plugins: [new BundleAnalyzerPlugin()],
});
