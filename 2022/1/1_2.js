const fs = require("fs")
const input = fs.readFileSync("1.txt", "utf-8")
let largest = []
let current = 0

function sortArray(array) {
  array.sort(function(a, b) {
    return a - b;
  })
}

function checkCalories() {
  input.split(/\r?\n/).forEach(line => {
    if (line == "") {
      largest.push(current)
      current = 0
    } else {
      current += Number(line)
    }
  })
  sortArray(largest)
  largest = largest.slice(largest.length - 3)
  const sum = largest.reduce((accumulator, value) => {
    return accumulator + value
  }, 0)
  console.log("Answer:", sum)
}

checkCalories()