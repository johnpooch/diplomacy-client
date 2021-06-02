const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|webp|png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.USE_MOCK_SERVICE_WORKER':
        process.env.USE_MOCK_SERVICE_WORKER || true,
      'process.env.SERVICE_URI': JSON.stringify(
        process.env.SERVICE_URI || 'http://127.0.0.1:8082/api/v1/'
      ),
    }),
  ],
};
