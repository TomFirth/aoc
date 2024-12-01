const fs = require("fs")
const input = fs.readFileSync("3.txt", "utf-8")
let answer = 0
let array = []

const priority = [
  undefined,
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

function makeArray() {
  input.split(/\r?\n/).forEach(line => {
    array.push(line)
  })
  return array
}

function start() {
  const newInput = makeArray()
  for (i = 0; i < newInput.length; i += 3) {
    let first = newInput[i]
    let second = newInput[i+1]
    let third = newInput[i+2]
    for (j = 0; j < first.length; j++) {
      if (second.includes(first[j]) && third.includes(first[j])) {
        answer += priority.indexOf(first[j])
        break
      }
    }
  }
}

start()
console.log("Answer:", answer)