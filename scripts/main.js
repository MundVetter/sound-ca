const eca = require('eca')
const $ = require('jquery')
const getAudio = require('./getAudio.js')
const formatBlob = require('./formatBlob.js')

let myEca = new eca(90, {width: 81, seed: '1'})
let audio

genEca(40)
getAudio((data) => {
  reset(data)
})
//generate an eca and add it to the dom
function genEca(times, callback = () => {}) {
  for (let i = 0; i < times; i++) {
    myEca.genLattice()
  }
  callback()
  for (let i = 0; i < times; i++) {
    addLattice(myEca.lattices[i])
  }
}
//add a lattice to the dom
function addLattice(lattice) {
  $('.container').append('<div class="lattice"></div>')
  for (const cell of lattice) {
    let value = (cell == '0' ? 'off' : 'on')
    $('.lattice').last().append(`<div class="cell ${value}"></div>`)
  }
}
//remove current eca from the dom and add a new one to the dom
function reset(audio) {
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
    })
  })
}
