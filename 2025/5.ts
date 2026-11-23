
import * as fs from "fs";
import * as readline from "readline";

type Range = [bigint, bigint];

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input: fs.createReadStream("./5.txt"),
    crlfDelay: Infinity,
  });

  const ranges: Range[] = [];
  const available: bigint[] = [];

  let readingRanges = true;

  for await (const raw of rl) {
    const line = raw.trim();

    if (!line) {
      readingRanges = false;
      continue;
    }

    if (readingRanges) {
      const [start, end] = line.split("-").map(BigInt);
      ranges.push([start, end]);
    } else {
      available.push(BigInt(line));
    }
  }

  const isFresh = (id: bigint): boolean =>
    ranges.some(([start, end]) => id >= start && id <= end);

  const totalPart1 = available.filter(isFresh).length;

  const sortedRanges = [...ranges].sort((a, b) =>
    a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
  );

  const mergedRanges: Range[] = [];

  for (const [start, end] of sortedRanges) {
    const last = mergedRanges[mergedRanges.length - 1];

    if (last && start <= last[1] + 1n) {
      last[1] = last[1] > end ? last[1] : end;
    } else {
      mergedRanges.push([start, end]);
    }
  }

  const totalPart2 = mergedRanges.reduce(
    (total, [start, end]) => total + (end - start + 1n),
    0n
  );

  console.log("Day 5, Part 1:", totalPart1);
  console.log("Day 5, Part 2:", totalPart2.toString());
}

main();
