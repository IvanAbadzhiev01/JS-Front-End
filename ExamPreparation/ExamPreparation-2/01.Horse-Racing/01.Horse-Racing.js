function solve(input) {
  const horses = input.shift().split("|");

  let line = input.shift();

  while (line != "Finish") {
    const lineArr = line.split(" ");
    const command = lineArr[0];
    const firstHors = lineArr[1];
    const secondHors = lineArr[2];

    switch (command) {
      case "Retake":
        const firstPositionIndex = horses.indexOf(firstHors);
        const secondPositionIndex = horses.indexOf(secondHors);
        if (firstPositionIndex < secondPositionIndex) {
          horses[firstPositionIndex] = secondHors;
          horses[secondPositionIndex] = firstHors;

          console.log(`${firstHors} retakes ${secondHors}.`);
        }
        break;
      case "Trouble":
        const index = horses.indexOf(firstHors);
        if (index > 0) {
          horses[index] = horses[index - 1];
          horses[index - 1] = firstHors;
          console.log(`Trouble for ${firstHors} - drops one position.`);
        }

        break;
      case "Rage":
        const horseIndex = horses.indexOf(firstHors);
        if (horseIndex === horses.length - 2) {
          horses[horses.length - 2] = horses[horses.length - 1];
          horses[horses.length - 1] = firstHors;
        } else if (horseIndex !== horses.length - 1) {
          horses[horseIndex] = horses[horseIndex + 1];
          horses[horseIndex + 1] = horses[horseIndex + 2];
          horses[horseIndex + 2] = firstHors;
        }
        console.log(`${firstHors} rages 2 positions ahead.`);
        break;
      case "Miracle":
        const lasthors = horses.shift();

        horses.push(lasthors);

        console.log(`What a miracle - ${lasthors} becomes first.`);
        break;
    }

    line = input.shift();
  }

  console.log(horses.join("->"));
  console.log(`The winner is: ${horses[horses.length - 1]}`);
}
