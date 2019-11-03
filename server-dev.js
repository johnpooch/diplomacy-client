const express = require('express')
const httpProxy = require('http-proxy')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const proxy = httpProxy.createProxyServer()
const app = express()

const config = require('./webpack.config.dev.js')
const compiler = Webpack(config)

const portWebpack = 8080
const portProxy = 8081

compiler.plugin('compile', () => {
  console.log('Bundling...')
})

compiler.plugin('done', () => {
  console.log('Bundled!')
})

const bundler = new WebpackDevServer(compiler, {
  publicPath: '/',
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
})

// app.use(WebpackMiddleware(compiler))
app.use(WebpackHotMiddleware(compiler))

bundler.listen(portWebpack, 'localhost', function () {
  console.log(`App listening on port ${portWebpack} (dev)`)
})

app.all('/*', (req, res) => {
  proxy.web(req, res, {
    target: `http://localhost:${portWebpack}`
  })
})

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...')
})

app.listen(portProxy, () => {
  console.log(`Server running on port ${portProxy}`)
})
