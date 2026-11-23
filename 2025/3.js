import * as fs from "fs";
import * as readline from "readline";

let totalPart1 = 0;
let totalPart2 = 0n;

const rl = readline.createInterface({
  input: fs.createReadStream("./3.txt"),
  crlfDelay: Infinity,
});

const getHighestPair = (bank) => {
  const digits = bank.split("").map(Number);

  for (let tens = 9; tens >= 0; tens--) {
    const tensIndex = digits.indexOf(tens);
    if (tensIndex === -1) continue;

    for (let units = 9; units >= 0; units--) {
      const unitsIndex = digits.indexOf(units, tensIndex + 1);
      if (unitsIndex !== -1) {
        return tens * 10 + units;
      }
    }
  }
  return -1;
};

const getBest12 = (bank) => {
  const digits = bank.split("").map(Number);
  const result = [];

  let searchStart = 0;
  const selectCount = 12;

  for (let remaining = selectCount; remaining > 0; remaining--) {
    const lastSearchIndex = digits.length - remaining;

    const { index: bestIndex, digit: bestDigit } = digits
      .slice(searchStart, lastSearchIndex + 1)
      .reduce(
        (best, digit, localIdx) =>
          digit > best.digit
            ? { index: searchStart + localIdx, digit }
            : best,
        { index: -1, digit: -1 }
      );

    result.push(bestDigit);
    searchStart = bestIndex + 1;
  }

  return BigInt(result.join(""));
};

for await (const raw of rl) {
  const bank = raw.trim();
  if (!bank) continue;

  totalPart1 += getHighestPair(bank);
  totalPart2 += getBest12(bank);
}

console.log("Day3, Part 1:", totalPart1);
console.log("Day3, Part 2:", totalPart2.toString());
