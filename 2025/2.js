import * as fs from 'fs';
import * as readline from 'readline';

let totalPart1 = 0;
let totalPart2 = 0;

const rl = readline.createInterface({
  input: fs.createReadStream('./2.txt'),
  crlfDelay: Infinity,
});

const isRepeatedTwice = (num) => {
  const string = String(num);

  if (string.length % 2 !== 0) return false;
  if (string[0] === '0') return false;

  const half = string.length / 2;

  return string.slice(0, half) === string.slice(half);
};

const isRepeatedAtLeastTwice = (num) => {
  const string = String(num);
  const len = string.length;

  for (let size = 1; size <= Math.floor(len / 2); size++) {
    if (len % size !== 0) continue;

    const pattern = string.slice(0, size);
    const repeats = pattern.repeat(len / size);

    if (repeats === string) return true;
  }

  return false;
};

for await (const raw of rl) {
  const ranges = raw.trim().split(",");

  for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      if (isRepeatedTwice(i)) {
        totalPart1 += i;
      }

      if (isRepeatedAtLeastTwice(i)) {
        totalPart2 += i;
      }
    }
  }
}

console.log("Day 2, Part 1:", totalPart1);
console.log("Day 2, Part 2:", totalPart2);
