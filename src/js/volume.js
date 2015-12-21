'use strict';

var hg = require('mercury');
var h = hg.h;

var getUserMedia = require('getusermedia');
var ctx = require('audio-context');

var SoundMeter = require('./soundmeter.js');
var soundMeter = new SoundMeter(ctx);

var constraints = {
  audio: true,
  video: false
};

function Volume() {
  var state = hg.state({
    instant: hg.value(0),
    slow: hg.value(0),
    channels: {
      changeInstant: changeInstant,
      changeSlow: changeSlow,
    }
  });

  getUserMedia(constraints, function (err, stream) {
    if (err) {
      console.log('failed');
    } else {
      soundMeter.connectToSource(stream);
      setInterval(function() {
        changeInstant(state, { instant: soundMeter.instant.toFixed(2) });
        changeSlow(state, { slow: soundMeter.slow.toFixed(2) });
      }, 500);
    }
  });

  return state;
}

function changeInstant(state, data) {
  state.instant.set(data.instant);
}

function changeSlow(state, data) {
  state.slow.set(data.slow);
}

Volume.render = function render(state) {

  var input = h('input', {
    type: 'number',
    name: 'slow',
    value: state.volume.slow,
    'ev-event': hg.sendChange(state.volume.channels.changeSlow)
  });

  var opts = {
    style: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      'z-index': 10,
      'background-color': 'green',
      'text-align': 'center'
    }
  };

  var text = 'Baby schläft...';
  if (state.volume.slow>=0.10) {
    text = 'Baby ist wach!!!' 
    opts.style['background-color'] = 'red'; 
  }
  return h('div', opts, [
    h('h1', { margin: 'auto'}, text)
    //,input
  ]);
};

module.exports = Volume;

