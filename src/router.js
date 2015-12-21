var debug = require('debug')('babyphone2go:router')
var express = require('express')

module.exports = function (config) {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'}) 
  })

  return router
}
