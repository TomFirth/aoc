import * as fs from "fs";
const data: string = fs.readFileSync("4.txt", "utf-8");

function findWord(grid: string[], word: string): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1],  // Right
    [0, -1], // Left
    [1, 0],  // Down
    [-1, 0], // Up
    [1, 1],  // Diagonal Down-Right
    [-1, -1],// Diagonal Up-Left
    [1, -1], // Diagonal Down-Left
    [-1, 1], // Diagonal Up-Right
  ];
  let count = 0;

  const isInBounds = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

  const searchDirection = (x: number, y: number, dx: number, dy: number) => {
    for (let i = 0; i < word.length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (!isInBounds(nx, ny) || grid[nx][ny] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of directions) {
        if (searchDirection(x, y, dx, dy)) {
          count++;
        }
      }
    }
  }

  return count;
}

const word = "XMAS";
const lines = data.trim().split("\n");

const totalA = findWord(lines, word);
  
console.log("Day 4, Part 1:", totalA);