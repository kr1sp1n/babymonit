
var express = require('express')
var http = require('http')

module.exports = function (config) {
  var router = require(__dirname + '/router.js')(config)
  var app = express()
  app.use(express.static(__dirname + '/../dist'))
  var port = config.port || 5000
  app.set('port', port)

  app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')

  // mount router
  app.use('/', router)
  var server = http.createServer(app)
  server.app = app
  return server
}
