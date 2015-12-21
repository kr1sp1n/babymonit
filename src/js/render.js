'use strict';

var hg = require('mercury');
var h = hg.h;

var Volume = require(__dirname + '/volume.js');

module.exports = function render(state) {
  return h('div', [
    h('div', [
      Volume.render(state)
    ])
  ]);
};
