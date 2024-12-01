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

const config = [
  ["C", "A", "B"],
  ["A", "B", "C"],
  ["B", "C", "A"]
]

input.split(/\r?\n/).forEach(line => {
  const player = line.split(" ")[0]
  const me = line.split(" ")[1]
  if (player != undefined || me != undefined) {
    const adjustedMe = config[rps[player]][rps[me]]
    total += outcomes[rps[player]][rps[adjustedMe]] + points[rps[adjustedMe]]
  }
})
console.log("Answer:", total)