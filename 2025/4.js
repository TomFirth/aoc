import * as fs from "fs";
import * as readline from "readline";

let totalPart1 = 0;
let totalPart2 = 0;

const rl = readline.createInterface({
  input: fs.createReadStream("./4.txt"),
  crlfDelay: Infinity,
});

const grid = [];

for await (const raw of rl) {
  const line = raw.trim();
  if (line) grid.push([...line]);
}

const H = grid.length;
const W = grid[0].length;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1]
];

const countAdjacent = (r, c, board) =>
  directions.filter(([dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    return nr >= 0 && nr < H && nc >= 0 && nc < W && board[nr][nc] === "@";
  }).length;

const findAccessible = board =>
  board.flatMap((row, r) =>
    row
      .map((cell, c) => ({ cell, r, c }))
      .filter(({ cell, r, c }) => cell === "@" && countAdjacent(r, c, board) < 4)
      .map(({ r, c }) => [r, c])
  );

const accessiblePart1 = findAccessible(grid);
totalPart1 = accessiblePart1.length;

let workingGrid = grid.map(row => [...row]);

while (true) {
  const toRemove = findAccessible(workingGrid);

  if (toRemove.length === 0) break;

  toRemove.forEach(([r, c]) => {
    workingGrid[r][c] = ".";
  });

  totalPart2 += toRemove.length;
}

console.log("Day4, Part 1:", totalPart1);
console.log("Day4, Part 2:", totalPart2);
