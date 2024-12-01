import * as fs from "fs";
const data: string = fs.readFileSync('2.txt', 'utf-8');

const max = {
  red: 12,
  green: 13,
  blue: 14
};

const getNumber = (string: string): number => {
  const match = string.match(/\d+/);
  return parseInt(match[0], 10);
};

const game = (data: string): { highest: number[]; lowest: number[]; power: number[] } => {
  let highest: number[] = [], lowest: number[] = [], power: number[] = [];

  data.split(/\r?\n/).map(line => {
    const id = getNumber(line);
    let highRed = 0, highGreen = 0, highBlue = 0;
    let lowRed = 0, lowGreen = 0, lowBlue = 0;
    line = line.substring(line.indexOf(": ") + 2);
    const reveals: string[] = line.split("; ");
    reveals.map(handful => {
      const colours: string[] = handful.split(", ");
      colours.map(pull => {
        const [count, rgb] = pull.split(" ");
        if (rgb === "red") {
          if (Number(count) > highRed) highRed = Number(count);
          else if (Number(count) > 0 || Number(count) < lowRed) {
            lowRed = Number(count);
          }
        } else if (rgb === "green") {
          if (Number(count) > highGreen) highGreen = Number(count);
          else if (Number(count) > 0 || Number(count) < lowGreen) {
            lowGreen = Number(count);
          }
        } else if (rgb === "blue") {
          if (Number(count) > highBlue) highBlue = Number(count);
          else if (Number(count) > 0 || Number(count) < lowBlue) {
            lowBlue = Number(count);
          }
        }
      });
    });
    if (highRed <= max['red'] && highGreen <= max['green'] && highBlue <= max['blue']) {
      highest.push(id);
    } else if (lowRed <= max['red'] && lowGreen <= max['green'] && lowBlue <= max['blue']) {
      lowest.push(id);
    }
    power.push(highRed * highGreen * highBlue);
  });
  return { highest, lowest, power };
};

const { highest, lowest, power } = game(data);

console.log("Day 2, Part 1:", highest.reduce((total, num) => total + num, 0));
console.log("Day 2, Part 2:", lowest.reduce((total, num) => total + num, 0));
console.log("Power:", power.reduce((total, num) => total + num, 0)); // 66027