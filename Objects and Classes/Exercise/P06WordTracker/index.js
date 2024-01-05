function solve(input) {
  const [searchWord, ...words] = input;

  const curwords = searchWord.split(" ").reduce((acc, curr) => {
    acc[curr] = 0;

    return acc;
  }, {});

  words.forEach((word) => {
    if (curwords.hasOwnProperty(word)) {
      curwords[word]++;
    }
  });

  const sorted = Object.entries(curwords);

  // Sort the array in descending order based on the values
  sorted.sort((a, b) => b[1] - a[1]);

  // Convert the sorted array back into an object
  const sortedObj = Object.fromEntries(sorted);

  Object.entries(sortedObj).forEach(([key, value]) => {
    console.log(`${key} - ${value}`);
  });
}
solve([
  "is the",
  "first",
  "sentence",
  "Here",
  "is",
  "another",
  "the",
  "And",
  "finally",
  "the",
  "the",
  "sentence",
]);
