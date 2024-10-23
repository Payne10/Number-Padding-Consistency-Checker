"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberPadding = checkNumberPadding;
function checkNumberPadding(intStrs) {
    const intStrArray = Array.from(intStrs);
    if (intStrArray.length === 0) {
        return 0; // No observations
    }
    const totalLengths = new Set();
    const unpaddedLengths = new Set();
    let minUnpaddedLength = Infinity;
    let hasPadding = false;
    const paddedTotalLengths = new Set();
    for (const intStr of intStrArray) {
        let leadingZeros = 0;
        for (const char of intStr) {
            if (char === '0') {
                leadingZeros++;
            }
            else {
                break;
            }
        }
        if (leadingZeros > 0) {
            hasPadding = true;
            paddedTotalLengths.add(intStr.length);
        }
        const unPaddedLength = intStr.length - leadingZeros;
        totalLengths.add(intStr.length);
        unpaddedLengths.add(unPaddedLength);
        minUnpaddedLength = Math.min(minUnpaddedLength, unPaddedLength);
    }
    if (!hasPadding) {
        // No padding observed
        if (intStrArray.length === 1 || unpaddedLengths.size === 1) {
            return -minUnpaddedLength;
        }
        else {
            // Check for majority total length
            const totalLengthCounts = {};
            for (const s of intStrArray) {
                totalLengthCounts[s.length] = (totalLengthCounts[s.length] || 0) + 1;
            }
            const totalLengthCountsValues = Object.values(totalLengthCounts);
            const maxCountTotalLength = Math.max(...totalLengthCountsValues);
            if (maxCountTotalLength > intStrArray.length / 2) {
                const majorityLength = parseInt(Object.keys(totalLengthCounts).find((key) => totalLengthCounts[parseInt(key)] === maxCountTotalLength));
                return majorityLength;
            }
            else {
                return -minUnpaddedLength;
            }
        }
    }
    else {
        // Padding observed
        if (paddedTotalLengths.size === 1) {
            const paddingLength = Array.from(paddedTotalLengths)[0];
            return paddingLength;
        }
        return -1;
    }
}
// Test cases
console.log(checkNumberPadding(["001", "002"])); // Expected: 3
console.log(checkNumberPadding(["001", "002", "9999"])); // Expected: 3
console.log(checkNumberPadding(["1", "2", "999"])); // Expected: 1
console.log(checkNumberPadding(["999", "9999"])); // Expected: -3
console.log(checkNumberPadding(["99", "999", "9999"])); // Expected: -2
console.log(checkNumberPadding(["01", "002"])); // Expected: -1
console.log(checkNumberPadding([])); // Expected: 0
console.log(checkNumberPadding(["999"])); // Expected: -3
console.log(checkNumberPadding(["01", "999", "9999"])); // Expected: 2
