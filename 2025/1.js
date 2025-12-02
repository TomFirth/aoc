import * as fs from 'fs';
import * as readline from 'readline';

const doTheThing = async (data) => {
  let current = 50;
  let zeroCount = 0;
  let zeroCountPass = 0;
  let r;
  let next;

  const fileStream = fs.createReadStream(data);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const countZeroHits = (start, dir, amount) => {
    if (dir === 'R') { r = (100 - (start % 100)) % 100; }
    else { r = start % 100; }

    if (r === 0) return Math.floor(amount / 100);
    return r <= amount ? 1 + Math.floor((amount - r) / 100) : 0;
  };

  for await (const raw of rl) {
    const line = raw.trim();
    const direction = line.charAt(0);
    const amount = Number(line.slice(1));

    zeroCountPass += countZeroHits(current, direction, amount);

    if (direction === 'L') { next = (current - (amount % 100) + 100) % 100; }
    else { next = (current + (amount % 100)) % 100; }

    if (next === 0) zeroCount++;
    current = next;
  }

  console.log('Part 1:', zeroCount);
  console.log('Part 2:', zeroCountPass);
};

doTheThing('./1.txt');