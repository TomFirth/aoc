import * as fs from "fs";
const data: string = fs.readFileSync("2.txt", "utf-8");

type Levels = number[];

let totalA = 0;
let totalB = 0;

const isValidSequence = (levels: Levels): boolean => {
  for (let i = 0; i < levels.length; i++) {
    const modifiedArr: Levels = [...levels.slice(0, i), ...levels.slice(i + 1)];
    if (checkSequence(modifiedArr)) return true;
  }
  return false;
}

const checkSequence = (levels: Levels): boolean => {
  const isIncreasing = levels[0] < levels[levels.length - 1];

  for (let i = 1; i < levels.length; i++) {
    const diff = isIncreasing
      ? levels[i] - levels[i - 1]
      : levels[i - 1] - levels[i];

    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

data.trim().split(/\r?\n/).map(report => {
  const levels: Levels = report.split(" ").map(Number);

  if (checkSequence(levels)) { 
    totalA++; 
    totalB++; 
  }
  else if (isValidSequence(levels)) totalB++;
});

console.log("Day 2, Part 1:", totalA);
console.log("Day 2, Part 2:", totalB);
