function formatBlob(blob, width, callback) {
  test.off = 0
  test.on = 0
  let reader = new window.FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = function() {
    base64data = reader.result
    let binary = ''
    for (let i = 3000; i <3000 + width; i++) {
      console.log();
      const ascii = base64data.charCodeAt(i)
        if(ascii % 2 == 0) {
          binary += '1'
        } else {
          binary += '0'
        }
    }
    callback(binary)
  }
}
module.exports = formatBlob
