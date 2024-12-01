const fs = require("fs")
const input = fs.readFileSync("6.txt", "utf-8")

let marker = []
let unique = []

for (let i = 0; i < input.length; i++) {
  marker = [input[i], input[i+1], input[i+2], input[i+3]] // create marker
  unique = Array.from(new Set(marker)) // find unique elements in marker
  if (marker.length == unique.length) { // compare marker against unique elements
    console.log(i+4, marker, unique) // Answer is i + length of marker
    break
  }
}