const fs = require("fs")
const input = fs.readFileSync("1.txt", "utf-8")
let largest = 0
let current = 0
input.split(/\r?\n/).forEach(line => {
  if (line == "") {
    if (current > largest) {
      largest = current
    }
    current = 0
  } else {
    current += Number(line)
  }
})
console.log("Answer:", largest)