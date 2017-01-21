const test = {
  off: 0,
  on: 0
}

function formatBlob(blob, width, callback) {
  test.off = 0
  test.on = 0
  let reader = new window.FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = function() {
    base64data = reader.result
    let binary = ''
    let max = 3000;
    for (let i = 3000; i <max + width; i++) {
      console.log();
      const ascii = base64data.charCodeAt(i)

      if (ascii == 47 || ascii == 65) {
        max ++
      } else {
        //console.log(ascii);
        if(ascii % 2 == 0) {
          binary += '1'
          test.on ++
        } else {
          binary += '0'
          test.off ++
        }
      }
    }
    //console.log(test.on / (test.off + test.on));
    // test.binary.push(binary)
    // console.log(test.binary);
    callback(binary)
  }
}
module.exports = formatBlob
