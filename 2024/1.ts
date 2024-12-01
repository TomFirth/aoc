import * as fs from 'fs';
import * as readline from 'readline';

const createColumns = async (data: string): Promise<{ arrayA: number[]; arrayB: number[] }>  => {
  let arrayA: number[] = [];
  let arrayB: number[] = [];
  const fileStream = fs.createReadStream(data);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [a, b] = line.split(/\s+/).map(Number);
    arrayA.push(Number(a));
    arrayB.push(Number(b));
  }
  return { arrayA, arrayB };
}

createColumns('./1.txt')
  .then(({ arrayA: a, arrayB: b }) => {
    return {
      a: a.map(Number).sort((x, y) => x - y),
      b: b.map(Number).sort((x, y) => x - y)
    }
  })
  .then(({ a, b }) => {
    let totalA: number = 0;
    let totalB: number = 0;
    for (let i = 0; i < a.length; i++) {
      let left = a[i];
      let right = b[i];
      if (left > right) totalA += left - right;
      else totalA += right - left;
    }
    a.map(num => {
      const count = b.filter(x => x === num).length;
      if (count > 0) totalB += num * count;
    });
    console.log("Day 1, Part 1:", totalA);
    console.log("Day 1, Part 2:", totalB);
  });
