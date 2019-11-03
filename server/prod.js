const express = require('express')
const path = require('path')

const DIST_DIR = path.join(__dirname, '../dist')
const port = 8080

const app = express()

app.use(express.static(DIST_DIR))
app.listen(port, function () {
  console.log(`App listening on port ${port} (prod)`)
})
