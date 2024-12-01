import * as fs from "fs";
const data: string = fs.readFileSync('1.txt', 'utf-8');

let lineNumbers: number[] = [];
let lineNumbersTwo: number[] = [];
let oneArray: number[] = [];
let twoArray: number[] = [];

const expandText = (string: string) => {
  let replaceString = string;
  replaceString = replaceString.replaceAll("one", "o1ne");
  replaceString = replaceString.replaceAll("two", "t2wo");
  replaceString = replaceString.replaceAll("three", "t3hree");
  replaceString = replaceString.replaceAll("four", "f4our");
  replaceString = replaceString.replaceAll("five", "f5ive");
  replaceString = replaceString.replaceAll("six", "s6ix");
  replaceString = replaceString.replaceAll("seven", "s7even");
  replaceString = replaceString.replaceAll("eight", "e8ight");
  replaceString = replaceString.replaceAll("nine", "n9ine");
  return replaceString;
}

const getNumbers = (input: string): number[] => {
  const regex = /\d/g;
  const numbers: number[] = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    numbers.push(parseInt(match[0], 10));
  }
  return numbers;
}

const combineNumbers = (num1: number, num2: number): number => {
  const concatenatedString: string = `${num1}${num2}`;
  return parseInt(concatenatedString, 10);
}

data.split(/\r?\n/).map(line => {
  lineNumbers = getNumbers(line);
  lineNumbersTwo = getNumbers(expandText(line));
  if (lineNumbers.length > 1) {
    oneArray.push(combineNumbers(lineNumbers[0], lineNumbers[lineNumbers.length-1]));
  } else {
    oneArray.push(combineNumbers(lineNumbers[0], lineNumbers[0]));
  }
  if (lineNumbersTwo.length > 1) {
    twoArray.push(combineNumbers(lineNumbersTwo[0], lineNumbersTwo[lineNumbersTwo.length-1]));
  } else {
    twoArray.push(combineNumbers(lineNumbersTwo[0], lineNumbersTwo[0]));
  }
});

console.log("Day 1, Part 1:", oneArray.reduce((total, num) => total + num, 0));
console.log("Day 1, Part 2:", twoArray.reduce((total, num) => total + num, 0));