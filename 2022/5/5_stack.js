const fs = require("fs")
const input = fs.readFileSync("5.txt", "utf-8")

let stack = [[], []]
let counter = 1
let first = true

function createStack() {
  input.split(/\r?\n/).forEach(line => {
    counter = 1
    if (line[0] !== "m") {
      for (c = 0; c < line.length; c+=4) {
        if (line[c+1] !== " " && isNaN(Number(line[c+1]))) {
          stack[counter].push(line[c+1])
        }
        if (first) stack.push([])
        counter++
      }
      !first
    }
  })
  let stackFiltered = stack.filter(e => {
    return e != null && e != '' && e != []
  })
  return stackFiltered
}

module.exports = { createStack }