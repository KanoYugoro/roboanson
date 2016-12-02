"use strict";

// Inspired by the hubot pugme package, but there is no limit on its pugbomb functionality
// and I considered that dangerous.  So I made a quick adjustment and rewrote it in javascript.
var request = require('request');

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (robot) {
  robot.hear(/roll( (\d+))?.+/i, function(res) {
    var numDigits = Number(res.match[2]) || 3;
    if (numDigits > 9) {
      numDigits = 9;
    }

    if (numDigits < 1) {
      numDigits = 1;
    }

    var retStr = '';
    for (var i = 0; i < numDigits; i++) {
      retStr = retStr + (Math.floor(Math.random() * 10));
    }
    res.send(retStr);
  });
};

module.exports = exports["default"];
