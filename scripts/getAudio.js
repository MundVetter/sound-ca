const MediaStreamRecorder = require('msr')

//don't use the first recording
let first = true

function getAudio(update) {
  navigator.getUserMedia({audio: true}, onMediaSuccess, onMediaError)

  function onMediaSuccess(stream) {
      const mediaRecorder = new MediaStreamRecorder(stream)
      mediaRecorder.mimeType = 'audio/wav'
 
      mediaRecorder.ondataavailable = function (blob) {
        if(!first) {
          update(blob)
        } else {
          first = false
        }
      }
      mediaRecorder.start(3000)
  }

  function onMediaError(e) {
      console.error('media error', e)
  }
}
module.exports = getAudio
