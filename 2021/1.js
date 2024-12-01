const { input } = require("./1_data.json")

const partOne = data => {
  let sum = 0
  data.forEach((value, index) => {
    if (data[index-1] < value) {
      sum++
    }
  })
  return sum
}
console.log("1.1", partOne(input))

const partTwo = data => {
  let totalArray = []
  data.forEach((value, index) => {
    if (parseInt(value) > 0 && parseInt(data[index+1]) > 0 && parseInt(data[index+2]) > 0) {
      totalArray.push(parseInt(value) + parseInt(data[index + 1]) + parseInt(data[index + 2]))
    }
  })
  return partOne(totalArray)
}
console.log("1.2", partTwo(input))