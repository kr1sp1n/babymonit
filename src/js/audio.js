
var SoundMeter = require('./soundmeter.js');

var getUserMedia = require('getusermedia');
var ctx = require('audio-context');

var constraints = {
  audio: true,
  video: false
};

getUserMedia(constraints, function (err, stream) {
  // if the browser doesn't support user media 
  // or the user says "no" the error gets passed 
  // as the first argument. 
  if (err) {
    console.log('failed');
  } else {
    var soundMeter = new SoundMeter(ctx);
    soundMeter.connectToSource(stream);
    setInterval(function() {
      console.log('Now:', soundMeter.instant.toFixed(2));
      //console.log('Slow:', soundMeter.slow.toFixed(2));
    }, 500);
  }
});

