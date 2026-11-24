import * as fs from "fs";
import * as readline from "readline";

type Range = [bigint, bigint];

async function main(): Promise<void> {
    const file = fs.createReadStream("./5.txt");

    const rl = readline.createInterface({
        input: file,
        crlfDelay: Infinity
    });

    const ranges: Range[] = [];
    const available: bigint[] = [];

    let readingRanges = true;

    for await (const line of rl) {
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            readingRanges = false;
            continue;
        }

        if (readingRanges) {
            const parts = trimmedLine.split("-");

            const start = BigInt(parts[0]);
            const end = BigInt(parts[1]);

            ranges.push([start, end]);
        } else {
            const id = BigInt(trimmedLine);
            available.push(id);
        }
    }

    let freshCount = 0;

    for (const id of available) {
        let fresh = false;

        for (const range of ranges) {
            const start = range[0];
            const end = range[1];

            if (id >= start && id <= end) {
                fresh = true;
                break;
            }
        }

        if (fresh) {
            freshCount++;
        }
    }

    ranges.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        }

        if (a[0] > b[0]) {
            return 1;
        }

        return 0;
    });

    const mergedRanges: Range[] = [];

    for (const range of ranges) {
        const start = range[0];
        const end = range[1];

        if (mergedRanges.length === 0) {
            mergedRanges.push([start, end]);
            continue;
        }

        const lastRange = mergedRanges[mergedRanges.length - 1];
        const lastEnd = lastRange[1];

        if (start <= lastEnd + 1n) {
            if (end > lastEnd) {
                lastRange[1] = end;
            }
        } else {
            mergedRanges.push([start, end]);
        }
    }

    let totalFreshIds = 0n;

    for (const range of mergedRanges) {
        const start = range[0];
        const end = range[1];

        const rangeSize = end - start + 1n;

        totalFreshIds += rangeSize;
    }

    console.log("Day 5, Part 1:", freshCount);
    console.log("Day 5, Part 2:", totalFreshIds.toString());
}

main();
