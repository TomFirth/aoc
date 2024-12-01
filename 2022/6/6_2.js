// 6_2.js answers both parts, but 6_1 was originally answered differently

const fs = require("fs")
const input = fs.readFileSync("6.txt", "utf-8")

function doTheThing(amount) {
  for (let i = 0; i < input.length; i++) {
    let aggregator = "" // reset
    let marker = []
    let unique = []
    for (let j = 0; j < amount; j++) { // dynamically create marker
      aggregator += input[i+j] // add values
    }
    marker = aggregator.split("")
    unique = Array.from(new Set(marker)) // find unique elements in marker
    if (marker.length == unique.length) { // compare marker against unique elements
      return i + amount // i = starter // amount = length of marker
    }
  }
}

console.log("Answer Part 1", doTheThing(4))
console.log("Answer Part 2", doTheThing(14))