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
