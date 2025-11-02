import crypto from 'crypto';


function findLongestIncreasingSubstring(str) {
  const lowerStr = str.toLowerCase().replace(/[^a-z]/g, '');
  
  if (lowerStr.length === 0) {
    return { substring: '', startIndex: 0, endIndex: 0 };
  }

  let maxLength = 1;
  let currentLength = 1;
  let maxSubstrings = [];
  let currentStart = 0;

  // Find all longest increasing substrings
  for (let i = 1; i < lowerStr.length; i++) {
    if (lowerStr[i] > lowerStr[i - 1]) {
      currentLength++;
    } else {
      if (currentLength > maxLength) {
        maxLength = currentLength;
        maxSubstrings = [{ start: currentStart, end: i - 1 }];
      } else if (currentLength === maxLength) {
        maxSubstrings.push({ start: currentStart, end: i - 1 });
      }
      currentStart = i;
      currentLength = 1;
    }
  }

  // Check the last sequence
  if (currentLength > maxLength) {
    maxLength = currentLength;
    maxSubstrings = [{ start: currentStart, end: lowerStr.length - 1 }];
  } else if (currentLength === maxLength) {
    maxSubstrings.push({ start: currentStart, end: lowerStr.length - 1 });
  }

  // If only single character, return it
  if (maxLength === 1 && maxSubstrings.length === 0) {
    maxSubstrings = [{ start: 0, end: 0 }];
  }

  // Concatenate all longest substrings
  let concatenated = '';
  maxSubstrings.forEach(sub => {
    concatenated += lowerStr.substring(sub.start, sub.end + 1);
  });

  // Map back to original string indices
  const originalStart = str.toLowerCase().indexOf(lowerStr[maxSubstrings[0].start]);
  const originalEnd = str.toLowerCase().lastIndexOf(
    lowerStr[maxSubstrings[maxSubstrings.length - 1].end]
  );

  return {
    substring: concatenated,
    startIndex: originalStart,
    endIndex: originalEnd,
  };
}

function generateHash(productName) {
  return crypto
    .createHash('md5')
    .update(productName.toLowerCase())
    .digest('hex')
    .substring(0, 8);
}


export function generateProductCode(productName) {
  const hash = generateHash(productName);
  const { substring, startIndex, endIndex } = findLongestIncreasingSubstring(productName);
  
  // Format: <hash>-<startIndex><substring><endIndex>
  return `${hash}-${startIndex}${substring}${endIndex}`;
}
