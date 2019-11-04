// common reqs
const express = require('express')

// common
const app = express()
const port = process.env.PORT || 8080

if (process.env.NODE_ENV !== 'production') {
  // dev reqs
  const httpProxy = require('http-proxy')
  const webpack = require('webpack')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const WebpackDevServer = require('webpack-dev-server')

  // Webpack dev server
  const config = require('./webpack.config.dev.js')
  const compiler = webpack(config)

  const devServer = new WebpackDevServer(compiler, {
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  })

  app.use(webpackHotMiddleware(compiler))

  devServer.listen(port, 'localhost', function () {
    console.log(`App listening on port ${port}`)
  })

  // proxy server
  const portProxy = 8081
  const proxy = httpProxy.createProxyServer()

  proxy.on('error', (e) => {
    console.log('Could not connect to proxy, please try again...')
  })

  app.all('*', (req, res) => {
    proxy.web(req, res, {
      target: `http://localhost:${port}`
    })
  })

  app.listen(portProxy, () => {
    console.log(`Proxy running on port ${portProxy}`)
  })
} else {
  // prod reqs
  const path = require('path')

  // prod
  const DIST_DIR = path.join(__dirname, '../dist')
  app.use(express.static(DIST_DIR))
  app.listen(port, function () {
    console.log(`App listening on port ${port}`)
  })
}
