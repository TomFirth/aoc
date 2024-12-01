fs = require('fs')
const input = fs.readFile('./1.txt', 'utf8', function (err, data) {
  if (err) { return console.log(err); }
  console.log(data)
});

let sum = 0
let inputArray = input.split("\n")

// inputArray.forEach((value, key) => {
//   // divide by 3
//   // round down
//   // subtract 2
//   sum += Math.floor((value / 3) - 2)
// })

// console.log(sum)