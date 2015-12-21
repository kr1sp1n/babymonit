'use strict';

var hg = require('mercury');
var h = hg.h;
var Volume = require(__dirname + '/volume.js');

function App(initialState) {
  return hg.state({
    volume: Volume(),
    _hotVersion: hg.value(0)
  });
};

module.exports = App;
