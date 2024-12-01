const fs = require("fs")
const input = fs.readFileSync("2.txt", "utf-8")
let total = 0

const rps = {
  "A": 0,
  "X": 0,
  "B": 1,
  "Y": 1,
  "C": 2,
  "Z": 2
}

const points = [1, 2, 3]

const outcomes = [
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3]
]

input.split(/\r?\n/).forEach(line => {
  const player = line.split(" ")[0]
  const me = line.split(" ")[1]

  total += outcomes[rps[player]][rps[me]] + points[rps[me]]
})
console.log("Answer:", total)