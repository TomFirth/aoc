import * as fs from 'fs';
import * as readline from 'readline';

const doTheThing = async (data) => {
  let current = 50;
  let zeroCount = 0;
  let zeroCountPass = 0;

  const fileStream = fs.createReadStream(data);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const countZeroHits = (start, dir, amount) => {
    if (amount <= 0) return 0;
    if (dir === 'R') {
      const r = (100 - (start % 100)) % 100;
      if (r === 0) return Math.floor(amount / 100);
      return r <= amount ? 1 + Math.floor((amount - r) / 100) : 0;
    } else {
      const r = start % 100;
      if (r === 0) return Math.floor(amount / 100);
      return r <= amount ? 1 + Math.floor((amount - r) / 100) : 0;
    }
  };

  for await (const raw of rl) {
    const line = raw.trim();
    if (!line) continue;

    const direction = line.charAt(0);
    const amount = Number(line.slice(1));

    zeroCountPass += countZeroHits(current, direction, amount);

    let next;
    if (direction === 'L') {
      next = (current - (amount % 100) + 100) % 100;
    } else {
      next = (current + (amount % 100)) % 100;
    }

    if (next === 0) zeroCount++;

    current = next;
  }

  console.log('Day 1, Part 1:', zeroCount);
  console.log('Day 1, Part 2:', zeroCountPass);
};

doTheThing('./1.txt');