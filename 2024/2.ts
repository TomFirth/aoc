import * as fs from "fs";
const data: string = fs.readFileSync('2.txt', 'utf-8');

let totalA = 0;

data.split(/\r?\n/).map(report => {
  const levels = report.split(" ").map(Number);
  const withinRange = levels.every((level, i) => 
    i === 0 || (Math.abs(level - levels[i - 1]) <= 3 && Math.abs(level - levels[i - 1]) >= 1)
  );

  const isIncreasing = levels.every((level, i) => i === 0 || level >= levels[i - 1]);
  const isDecreasing = levels.every((level, i) => i === 0 || level <= levels[i - 1]);

  const isSafe = withinRange && (isIncreasing !== isDecreasing);
  if (isSafe) totalA++;
});

console.log("Day 2, Part 1:", totalA);