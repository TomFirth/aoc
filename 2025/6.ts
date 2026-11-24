
import * as fs from "fs";
import * as readline from "readline";

async function main(): Promise<void> {
    const rl = readline.createInterface({
        input: fs.createReadStream("./6.txt"),
        crlfDelay: Infinity
    });

    const rows: string[] = [];

    for await (const line of rl) {
        if (line.length > 0) {
            rows.push(line);
        }
    }

    const operationRow = rows.pop()!;
    const numberRows = rows;

    let width = operationRow.length;

    for (const row of numberRows) {
        if (row.length > width) {
            width = row.length;
        }
    }

    const paddedRows = numberRows.map(row => row.padEnd(width));
    const paddedOperations = operationRow.padEnd(width);

    const problems: [number, number][] = [];
    let start = -1;

    for (let column = 0; column < width; column++) {
        let blankColumn = true;

        for (const row of paddedRows) {
            if (row[column] !== " ") {
                blankColumn = false;
                break;
            }
        }

        if (!blankColumn && start === -1) {
            start = column;
        }

        if (blankColumn && start !== -1) {
            problems.push([start, column - 1]);
            start = -1;
        }
    }

    if (start !== -1) {
        problems.push([start, width - 1]);
    }

    function calculate(numbers: bigint[], operator: string): bigint {
        let result = operator === "*" ? 1n : 0n;

        for (const number of numbers) {
            if (operator === "*") {
                result *= number;
            } else {
                result += number;
            }
        }

        return result;
    }

    function getOperator(start: number, end: number): string {
        for (let column = start; column <= end; column++) {
            const character = paddedOperations[column];

            if (character === "+" || character === "*") {
                return character;
            }
        }

        throw new Error(`Missing operator at column ${start}`);
    }

    function getHorizontalNumbers(start: number, end: number): bigint[] {
        const numbers: bigint[] = [];

        for (const row of paddedRows) {
            const value = row.slice(start, end + 1).trim();

            if (value !== "") {
                numbers.push(BigInt(value));
            }
        }

        return numbers;
    }

    function getVerticalNumbers(start: number, end: number): bigint[] {
        const numbers: bigint[] = [];

        for (let column = end; column >= start; column--) {
            let digits = "";

            for (const row of paddedRows) {
                digits += row[column];
            }

            digits = digits.trim();

            if (digits !== "") {
                numbers.push(BigInt(digits));
            }
        }

        return numbers;
    }

    let totalPart1 = 0n;
    let totalPart2 = 0n;

    for (const problem of problems) {
        const startColumn = problem[0];
        const endColumn = problem[1];

        const operator = getOperator(startColumn, endColumn);

        const horizontalNumbers = getHorizontalNumbers(startColumn, endColumn);
        const verticalNumbers = getVerticalNumbers(startColumn, endColumn);

        totalPart1 += calculate(horizontalNumbers, operator);
        totalPart2 += calculate(verticalNumbers, operator);
    }

    console.log("Day 6, Part 1:", totalPart1.toString());
    console.log("Day 6, Part 2:", totalPart2.toString());
}

main();
