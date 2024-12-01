const fs = require("fs")
const input = fs.readFileSync("4.txt", "utf-8")
let answer = 0

input.split(/\r?\n/).forEach(line => {
  let sections = line.split(",")
  startOne = Number(sections[0].split("-")[0])
  endOne = Number(sections[0].split("-")[1])
  startTwo = Number(sections[1].split("-")[0])
  endTwo = Number(sections[1].split("-")[1])
  if ((startOne <= startTwo && endOne >= endTwo)
    || (startOne >= startTwo && endOne <= endTwo)
    || (startOne <= endTwo && startTwo <= endOne)) {
    answer++
  }
})
console.log("Answer:", answer)