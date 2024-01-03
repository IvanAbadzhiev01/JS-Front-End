function printDNA(rows) {
  // ATCGTTAGGG
  const pattern = [
    [`A`, `T`],
    [`C`, `G`],
    [`T`, `T`],
    [`A`, `G`],
    [`G`, `G`],
  ];

  for (let index = 0; index < rows; index++) {
    const [x, y] = pattern[index % pattern.length];
    if (index % 4 === 0) {
      console.log(`**${x}${y}**`);
    } else if (index % 2 === 1) {
      console.log(`*${x}--${y}*`);
    } else {
      console.log(`${x}----${y}`);
    }
  }
}
//printDNA(10);
