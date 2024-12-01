const fs = require("fs")
const input = fs.readFileSync("5.txt", "utf-8")
const { createStack } = require("./5_stack.js")

let crane = []
let result = ""

function movements(stack) {
  input.split(/\r?\n/).forEach(line => {
    if (line[0] == "m") { // move 1 from 4 to 1
      let details = line.split(" ")
      let quantity = details[1] // how many crates to move
      let from = details[3] // from where
      let to = details[5] // to where
      for (i = 0; i < quantity; i++) {
        crane = stack[from-1].shift() // remove from top of current row
        stack[to-1].unshift(crane) // add to top of new row
      }
    }
  })
  for (i = 0; i < stack.length; i++) { // get top crate from each row
    result += stack[i].shift()
  }
  console.log("Answer", result)
}

movements(createStack())