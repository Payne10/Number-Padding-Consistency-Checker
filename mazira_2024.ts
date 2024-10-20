export function checkNumberPadding(intStrs: Iterable<string>): number {
    const intStrArray = Array.from(intStrs);
    if (intStrArray.length === 0) {
        return 0; // Nothing to observe
    }

    const totalLengthCounts: Record<number, number> = {};
    const unpaddedLengthCounts: Record<number, number> = {};
    let minUnpaddedLength = Infinity;

    for (const intStr of intStrArray) {
        let leadingZeros = 0;
        for (const char of intStr) {
            if (char === '0') {
                leadingZeros++;
            } else {
                break;
            }
        }
        const unPaddedLength = intStr.length - leadingZeros;

        // Count total lengths
        totalLengthCounts[intStr.length] = (totalLengthCounts[intStr.length] || 0) + 1;
        // Count unpadded lengths
        unpaddedLengthCounts[unPaddedLength] = (unpaddedLengthCounts[unPaddedLength] || 0) + 1;

        minUnpaddedLength = Math.min(minUnpaddedLength, unPaddedLength);
    }

    const totalLengths = Object.keys(totalLengthCounts).map(Number);
    const unpaddedLengths = Object.keys(unpaddedLengthCounts).map(Number);

    // All numbers have the same total length
    if (totalLengths.length === 1) {
        return totalLengths[0];
    }

    // All numbers have the same unpadded length but different total lengths
    if (unpaddedLengths.length === 1) {
        return -1;
    }

    // Majority of numbers have the same total length
    const maxCountTotalLength = Math.max(...Object.values(totalLengthCounts));
    if (maxCountTotalLength > intStrArray.length / 2) {
        const majorityLength = parseInt(
            Object.keys(totalLengthCounts).find(
                (key) => totalLengthCounts[parseInt(key)] === maxCountTotalLength
            )!
        );
        return majorityLength;
    }

    // Inconsistent padding, return negative of smallest unpadded length
    return -minUnpaddedLength;
}


// Test cases
console.log(checkNumberPadding(["001", "002"]));        // Expected: 3
console.log(checkNumberPadding(["001", "002", "9999"])); // Expected: 3
console.log(checkNumberPadding(["1", "2", "999"]));     // Expected: 1
console.log(checkNumberPadding(["999", "9999"]));       // Expected: -3
console.log(checkNumberPadding(["99", "999", "9999"])); // Expected: -2
console.log(checkNumberPadding(["01", "002"]));         // Expected: -1
console.log(checkNumberPadding([]));                    // Expected: 0
