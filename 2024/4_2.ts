import * as fs from "fs";

// const data: string = fs.readFileSync("4.txt", "utf-8");
const data = 
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

// Split data into rows
const grid = data.trim().split("\n").map((line) => line.split(""));

// Create a "visited" grid to track checked cells
const visited = Array.from({ length: grid.length }, () =>
  Array(grid[0].length).fill(false)
);

const findPattern = (grid: string[][]): [number, number][] => {
  const results: [number, number][] = []; // Stores positions of matching centers
  const directions = [
    [-1, -1, 1, 1], // Top-left to bottom-right
    [-1, 1, 1, -1]  // Top-right to bottom-left
  ];

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (grid[row][col] === "A" && !visited[row][col]) {
        for (const [dx1, dy1, dx2, dy2] of directions) {
          const topLeftRow = row + dx1, topLeftCol = col + dy1;
          const bottomRightRow = row + dx2, bottomRightCol = col + dy2;

          const topLeft = grid[topLeftRow]?.[topLeftCol];
          const bottomRight = grid[bottomRightRow]?.[bottomRightCol];

          if (
            (topLeft === "M" && bottomRight === "S") || // MAS
            (topLeft === "S" && bottomRight === "M")    // SAM
          ) {
            // Mark all cells in the pattern as visited
            visited[row][col] = true;
            visited[topLeftRow][topLeftCol] = true;
            visited[bottomRightRow][bottomRightCol] = true;

            // Store the center position
            results.push([row, col]);
            break; // Avoid checking the second direction if already matched
          }
        }
      }
    }
  }

  return results;
};

const matches = findPattern(grid);

console.log(matches.length);
// matches.forEach(([row, col]) => {
//   console.log(`Center at row ${row + 1}, col ${col + 1}`);
// });
