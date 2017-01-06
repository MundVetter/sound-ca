(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
  Made by Mund & Mart for PWS to show a possible js implementation of
  ellementary cellular automata
*/
'use strict'

const leftPad = require('left-pad')

class eca {
  constructor(number, options = {}) {
    this.seed = options.seed  || '1'
    this.width = options.width || 11
    if (this.seed.length > this.width) {
      throw new Error('The lenght of the seed is bigger than the width of the eca.')
    }
    this.PATTERNS = [
      '111',
      '110',
      '101',
      '100',
      '011',
      '010',
      '001',
      '000'
    ]
    this.RESULTS = this._rule(number)

    this.lattices = []
    this._newLattice = ''
    this._initialLattice()
  }
  _rule(number) {
    if(number <= 0 || number >= 255)
      throw new Error(number + ' is not a rule!')
    return leftPad(number.toString(2), 8, 0)
  }
  //Generates the initial lattice from a seed
  _initialLattice() {
    this.lattices.push(this.seed)
    let margin = (this.width - this.seed.length) / 2

    if (margin % 1 != 0) {
      this.lattices[0] += '0'
      margin = Math.floor(margin)
    }
    for (let i = 0; i < margin; i++) {
      this.lattices[0] += '0'
    }
    for (let i = 0; i < margin; i++) {
      this.lattices[0] = '0' + this.lattices[0]
    }
  }
  // generates a new line and pushes the line into the lattices
  genLattice() {
    const CURR_LATTICE = this.lattices[this.lattices.length - 1]
    for (let i = 0; i < CURR_LATTICE.length; i++) {
      let a = i - 1
      let b = i + 2
      const neighborhood = this._getNeighborhood(CURR_LATTICE, a, b)
      for (let i = 0; i < this.PATTERNS.length; i++) {
        if (neighborhood == this.PATTERNS[i]) {
          this._newLattice += this.RESULTS.charAt(i)
          break
        }
      }
    }
    this.lattices.push(this._newLattice)
    this._newLattice = ''
    return this.lattices[this.lattices.length - 1]
  }
  _getNeighborhood(lattice, a, b) {
    let neighborhood = lattice.slice(a, b)
    // on the edge get the cell of the other side
    if(a < 0) {
      let begin = lattice.slice(a)
      let end = lattice.slice(0, b)
      neighborhood = begin + end
    } else if(b > lattice.length) {
      let begin  = lattice.slice(a)
      let end = lattice.slice(0, b - lattice.length)
      neighborhood = begin + end
    }
    return neighborhood
  }
}

module.exports = eca

},{"left-pad":2}],2:[function(require,module,exports){
/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */
'use strict';
module.exports = leftPad;

var cache = [
  '',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         '
];

function leftPad (str, len, ch) {
  // convert `str` to `string`
  str = str + '';
  // `len` is the `pad`'s length now
  len = len - str.length;
  // doesn't need to pad
  if (len <= 0) return str;
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) ch = ' ';
  // convert `ch` to `string`
  ch = ch + '';
  // cache common use cases
  if (ch === ' ' && len < 10) return cache[len] + str;
  // `pad` starts with an empty string
  var pad = '';
  // loop
  while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
  }
  // pad `str`!
  return pad + str;
}

},{}],3:[function(require,module,exports){
function formatBlob(blob, width, callback) {
  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {
    base64data = reader.result;
    let binary = ''
    for (let i = 3000; i <3000 + width; i++) {
      if (base64data.charCodeAt(i) % 2 == 0) {
        binary += '1';
      } else {
        binary += '0';
      }
    }
    console.log(binary);
    callback(binary);
  }
}
module.exports = formatBlob

},{}],4:[function(require,module,exports){
function getAudio(callback) {
  var mediaConstraints = {
    audio: true
  };
  navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

  function onMediaSuccess(stream) {
      var mediaRecorder = new MediaStreamRecorder(stream);
      mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
      mediaRecorder.ondataavailable = function (blob) {
        callback(blob);
      };
      mediaRecorder.start(3000);
  }

  function onMediaError(e) {
      console.error('media error', e);
  }
}

module.exports = getAudio

},{}],5:[function(require,module,exports){
const eca = require('eca');
const getAudio = require('./getAudio.js')
const formatBlob = require('./formatBlob.js')
let myEca = new eca(30, {width: 81, seed: '1'});
let audio;
genEca(40)
getAudio((data) => {
  audio = data;
  reset();
})
$('button').on('click', reset)

function genEca(times, c = () => {}) {
  for (var i = 0; i < times; i++) {
    myEca.genLattice()
  }
  c()
  for (var i = 0; i < times; i++) {
    addLattice(myEca.lattices[i])
  }
}
function addLattice(lattice) {
  $('.container').append('<div class="lattice"></div>')
  for (const c of lattice) {
    let value = (c == '0' ? 'off' : 'on');
    $('.lattice').last().append(`<div class="cell ${value}"></div>`)
  }
}
function reset() {
  const width = parseInt($('#width').val())
  const rule = parseInt($('#rule').val())
  const times = parseInt($('#times').val())
  formatBlob(audio, width, (data) => {
    myEca = new eca(rule, {
      width: width,
      seed: data
    })
    genEca(times, () => {
      $('.lattice').remove()
    });
  });
}

},{"./formatBlob.js":3,"./getAudio.js":4,"eca":1}]},{},[5]);
