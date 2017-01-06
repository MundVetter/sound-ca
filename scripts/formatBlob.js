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
