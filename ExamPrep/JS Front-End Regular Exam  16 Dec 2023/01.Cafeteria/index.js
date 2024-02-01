function solve(input) {
  const n = input.shift();

  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(input.shift());
  }

  const barists = arr.reduce((acc, curr) => {
    const [name, shift, skill] = curr.split(" ");

    acc[name] = {
      name,
      shift,
      skill: skill.split(","),
    };

    return acc;
  }, {});

  //console.log(JSON.stringify(barists, null, 2));

  let command;
  while ((command = input.shift()) !== "Closed") {
    const commandLine = command.split(" / ");
    const commandType = commandLine[0];

    const baristaName = commandLine[1];

    switch (commandType) {
      case "Prepare":
        const shift = commandLine[2];
        const coffeType = commandLine[3];
        if (
          barists[baristaName].shift === shift &&
          barists[baristaName].skill.includes(coffeType)
        ) {
          console.log(`${baristaName} has prepared a ${coffeType} for you!`);
        } else {
          console.log(
            `${baristaName} is not available to prepare a ${coffeType}.`
          );
        }

        break;
      case "Change Shift":
        const newShift = commandLine[2];
        barists[baristaName].shift = newShift;

        console.log(`${baristaName} has updated his shift to: ${newShift}`);

        break;
      case "Learn":
        const newCoffee = commandLine[2];

        if (barists[baristaName].skill.includes(newCoffee)) {
          console.log(`${baristaName} knows how to make ${newCoffee}.`);
        } else {
          barists[baristaName].skill.push(newCoffee);
          console.log(
            `${baristaName} has learned a new coffee type: ${newCoffee}.`
          );
        }

        break;
    }
  }

  // Barista: {barista name}, Shift: {shift}, Drinks: {drink type 1, drink type 2, ...}

  Object.values(barists).forEach((b) => {
    console.log(
      `Barista: ${b.name}, Shift: ${b.shift}, Drinks: ${b.skill.join(", ")}`
    );
  });
}


