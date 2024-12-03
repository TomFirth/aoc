import * as fs from "fs";
const data: string = fs.readFileSync("3.txt", "utf-8");

const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don\'t\(\)/g;

interface MulMatch {
  type: 'mul' | 'do' | "don't";
  firstNumber?: number;
  secondNumber?: number;
}

const matches: MulMatch[] = [];
let match: RegExpExecArray | null;
let matchEnabled: boolean = true;

while ((match = regex.exec(data)) !== null) {
  const matched = match[0];

  if (matched === "do()") matches.push({ type: "do" });
  else if (matched === "don't()") matches.push({ type: "don't" });
  else if (matched.startsWith("mul(")) {
    matches.push({
      type: "mul",
      firstNumber: parseInt(match[1], 10),
      secondNumber: parseInt(match[2], 10),
    });
  }
}

const totalA = matches.reduce((sum, match) => {
  if (match.type === "mul") {
    return sum + (match.firstNumber! * match.secondNumber!);
  }
  return sum;
}, 0);

const totalB = matches.reduce((sum, match) => {
  if (match.type === "do") matchEnabled = true;
  else if (match.type === "don't") matchEnabled = false;
  else if (matchEnabled && match.type === "mul") {
    return sum + (match.firstNumber! * match.secondNumber!);
  }
  return sum;
}, 0);

console.log("Day 3, Part 1:", totalA);
console.log("Day 3, Part 2:", totalB);
