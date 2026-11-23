
import * as fs from "fs";
import * as readline from "readline";

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input: fs.createReadStream("./6.txt"),
    crlfDelay: Infinity,
  });

  const rows: string[] = [];

  for await (const raw of rl) {
    if (raw.length > 0) rows.push(raw);
  }

  const operationRow = rows.pop()!;
  const numberRows = rows;

  const width = Math.max(
    operationRow.length,
    ...numberRows.map(row => row.length)
  );

  // Pad rows so every character position exists.
  const paddedRows = numberRows.map(row => row.padEnd(width));
  const paddedOperations = operationRow.padEnd(width);

  // Identify problem boundaries using completely blank columns.
  const problems: [number, number][] = [];
  let start = -1;

  for (let c = 0; c < width; c++) {
    const isBlank = paddedRows.every(row => row[c] === " ");

    if (!isBlank && start === -1) {
      start = c;
    }

    if (isBlank && start !== -1) {
      problems.push([start, c - 1]);
      start = -1;
    }
  }

  if (start !== -1) {
    problems.push([start, width - 1]);
  }

  let totalPart1 = 0n;
  let totalPart2 = 0n;

  for (const [start, end] of problems) {
    // Find the operator anywhere underneath this problem.
    const operator = paddedOperations
      .slice(start, end + 1)
      .split("")
      .find(char => char === "+" || char === "*");

    if (!operator) throw new Error(`Missing operator at column ${start}`);

    // Part 1: Read numbers horizontally.
    const horizontalNumbers = paddedRows
      .map(row => row.slice(start, end + 1).trim())
      .filter(value => value.length > 0)
      .map(BigInt);

    const resultPart1 = operator === "*"
      ? horizontalNumbers.reduce((a, b) => a * b, 1n)
      : horizontalNumbers.reduce((a, b) => a + b, 0n);

    totalPart1 += resultPart1;

    // Part 2: Read numbers vertically, right-to-left.
    const verticalNumbers: bigint[] = [];

    for (let c = end; c >= start; c--) {
      const digits = paddedRows
        .map(row => row[c])
        .join("")
        .trim();

      if (digits.length > 0) {
        verticalNumbers.push(BigInt(digits));
      }
    }

    const resultPart2 = operator === "*"
      ? verticalNumbers.reduce((a, b) => a * b, 1n)
      : verticalNumbers.reduce((a, b) => a + b, 0n);

    totalPart2 += resultPart2;
  }

  console.log("Day 6, Part 1:", totalPart1.toString());
  console.log("Day 6, Part 2:", totalPart2.toString());
}

main();
