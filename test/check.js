const fs = require('fs')
const data = fs.readFileSync('./sample.txt', 'utf8')
  .split(/\r?\n/).filter(value => value.length > 0)      

for (let i = 0; i < data[0].length; i++) {
  const row = []
  for (let j = 0; j < data.length; j++) {
    row.push(data[j].charAt(i))
  }
  console.log(checkRow(row))
}

function checkRow(row) {
  const state = row[0];
  for (const cell of row) {
    if (state != cell) {
      return false
    }
  }
  return true
}
