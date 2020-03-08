// common reqs
const express = require('express')

// common
const app = express()
const port = process.env.PORT || 8080

if (process.env.NODE_ENV !== 'production') {
  // dev only reqs
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
    },
    historyApiFallback: true
  })

  devServer.listen(port, 'localhost', () => {
    console.log(`App listening on port ${port}`)
  })

  // proxy server
  const portProxy = 8081
  const proxy = httpProxy.createProxyServer()

  proxy.on('error', (e) => {
    console.log('Could not connect to proxy, please try again...')
  })

  // dev server
  app.use(webpackHotMiddleware(compiler))

  app.all('*', (req, res) => {
    proxy.web(req, res, {
      target: `http://localhost:${port}`
    })
  })

  app.listen(portProxy, () => {
    console.log(`Proxy running on port ${portProxy}`)
  })
} else {
  // prod only reqs
  const path = require('path')

  // prod server
  const DIST_DIR = path.join(__dirname, '../dist')
  const INDEX_HTML = path.join(__dirname, 'src/index.html')

  app.use(express.static(DIST_DIR))

  app.get('/*', (req, res) => {
    res.sendFile(INDEX_HTML, (err) => {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
