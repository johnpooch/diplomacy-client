const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html'
})

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: { name: './static/[name].[ext]' }
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      Views: path.resolve(__dirname, 'src/views/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Utilities: path.resolve(__dirname, 'src/utils/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      JSON: path.resolve(__dirname, 'src/json/')
    }
  },
  stats: { children: false }
}
