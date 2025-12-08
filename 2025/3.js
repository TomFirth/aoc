import * as fs from 'fs';
import * as readline from 'readline';

let totalPart1 = 0;
let totalPart2 = 0n;

const rl = readline.createInterface({
  input: fs.createReadStream('./3.txt'),
  crlfDelay: Infinity,
});

const getHighestPair = (bank) => {
  const digits = bank.split('').map(Number);

  for (let tens = 9; tens >= 0; tens--) {
    const i = digits.indexOf(tens);
    if (i === -1) continue;

    for (let units = 9; units >= 0; units--) {
      for (let j = i + 1; j < digits.length; j++) {
        if (digits[j] === units) {
          return tens * 10 + units;
        }
      }
    }
  }

  return -1;
};

const getBest12 = (bank) => {
  const digits = bank.split('').map(Number);
  const need = 12;
  const keep = [];

  let start = 0;
  for (let k = need; k > 0; k--) {
    const end = digits.length - k;

    let bestDigit = -1;
    let bestIndex = -1;

    for (let i = start; i <= end; i++) {
      if (digits[i] > bestDigit) {
        bestDigit = digits[i];
        bestIndex = i;
      }
    }

    keep.push(bestDigit);
    start = bestIndex + 1;
  }

  return BigInt(keep.join(""));
};

for await (const raw of rl) {
  const bank = raw.trim();
  if (!bank) continue;

  const highestPair = getHighestPair(bank);
  totalPart1 += highestPair;

  const best12 = getBest12(bank);
  totalPart2 += best12;
}

console.log("Day3, Part 1:", totalPart1);
console.log("Day3, Part 2:", totalPart2.toString());
