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
