import * as fs from "fs";
const data: string = fs.readFileSync("3.txt", "utf-8");

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = [];
let match;

while ((match = regex.exec(data)) !== null) {
  matches.push({
    firstNumber: parseInt(match[1], 10),
    secondNumber: parseInt(match[2], 10)
  });
}

const totalA = matches.reduce((sum, match) => {
  return sum + (match.firstNumber * match.secondNumber);
}, 0);

console.log("Day 3, Part 1:", totalA);
