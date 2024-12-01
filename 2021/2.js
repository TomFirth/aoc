const { input } = require("./2_data.json")

const partOne = data => {
  let horizontal = 0
  let depth = 0
  data.forEach((value, index) => {
    if (value.includes("forward")) horizontal += parseInt(value.slice(8))
    else if (value.includes("down")) depth += parseInt(value.slice(5))
    else if (value.includes("up")) depth -= parseInt(value.slice(3))
  })
  return horizontal * depth
}
console.log("2.1", partOne(input))

const partTwo = data => {}
console.log("2.1", partTwo(input))