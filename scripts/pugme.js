"use strict";

// Inspired by the hubot pugme package, but there is no limit on its pugbomb functionality
// and I considered that dangerous.  So I made a quick adjustment and rewrote it in javascript.
var request = require('request');

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (robot) {
  robot.hear(/pug me/i, function(res) {
    if (res.message.user.name === 'anson.wayman') {
      request('http://pugme.herokuapp.com/random', function(err, response, body) {
        res.send(JSON.parse(body).pug);
      });
    } else {
      res.send('I only listen to Anson for this command.');
    }
  });

  robot.hear(/pug bomb( (\d+))?/i, function(res) {
    if (res.message.user.name === 'anson.wayman') {
      var numPugs = res.match[2] || 3;
      if (numPugs > 5) {
        res.send('Too many pugs requested.  I don\'t want to spam rocketchat.');
      } else if (numPugs <= 0) {
        res.send('That doesn\'t make sense as a requested number of pugs.');
      } else {
        request('http://pugme.herokuapp.com/bomb?count=' + numPugs, function(err, response, body) {
          var pugs = JSON.parse(body).pugs;
          for (var i = 0; i < pugs.length; i++) {
            res.send(pugs[i]);
          }
        });
      }
    } else {
      res.send('I only listen to Anson for this command.');
    }
  });
};

module.exports = exports["default"];
