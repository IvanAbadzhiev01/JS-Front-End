function solve(input) {
  const teamNumber = input.shift();

  const astro = [];

  for (let i = 0; i < teamNumber; i++) {
    astro.push(input.shift());
  }

  const astroTeam = astro.reduce((acc, curr) => {
    let [astronautName, oxygenLevel, energyReserves] = curr.split(" ");

    if (!checkNumber0to100(Number(oxygenLevel))) {
      oxygenLevel = "100";
    }
    if (!checkNumber0to200(Number(energyReserves))) {
      energyReserves = "200";
    }

    acc[astronautName] = {
      astronautName,
      oxygenLevel: Number(oxygenLevel),
      energyReserves: Number(energyReserves),
    };

    return acc;
  }, {});

  let command;
  while ((command = input.shift()) !== "End") {
    commandLine = command.split(" - ");
    const commandType = commandLine[0];
    const astroName = commandLine[1];
    const amount = Number(commandLine[2]);

    switch (commandType) {
      case "Explore":
        if (astroTeam[astroName].energyReserves < amount) {
          console.log(`${astroName} does not have enough energy to explore!`);
        } else {
          astroTeam[astroName].energyReserves -= amount;
          console.log(
            `${astroName} has successfully explored a new area and now has ${astroTeam[astroName].energyReserves} energy!`
          );
        }

        break;
      case "Refuel":
        if (checkNumber0to200(astroTeam[astroName].energyReserves + amount)) {
          astroTeam[astroName].energyReserves += amount;
          console.log(`${astroName} refueled their energy by ${amount}!`);
        } else {
          const toFull = 200 - astroTeam[astroName].energyReserves;
          astroTeam[astroName].energyReserves += toFull;
          console.log(`${astroName} refueled their energy by ${toFull}!`);
        }

        break;
      case "Breathe":
        if (checkNumber0to100(astroTeam[astroName].oxygenLevel + amount)) {
          astroTeam[astroName].oxygenLevel += amount;
          console.log(
            `${astroName} took a breath and recovered ${amount} oxygen!`
          );
        } else {
          const toFull = 100 - astroTeam[astroName].oxygenLevel;
          astroTeam[astroName].oxygenLevel += toFull;
          console.log(
            `${astroName} took a breath and recovered ${toFull} oxygen!`
          );
        }

        break;
    }
  }

  Object.values(astroTeam).forEach((ast) => {
    console.log(
      `Astronaut: ${ast.astronautName}, Oxygen: ${ast.oxygenLevel}, Energy: ${ast.energyReserves}`
    );
  });

  function checkNumber0to100(number) {
    // Check if the number is between 0 and 100
    if (!isNaN(number) && number >= 0 && number <= 100) {
      return true;
    } else {
      return false;
    }
  }
  function checkNumber0to200(number) {
    // Check if the number is between 0 and 200
    if (!isNaN(number) && number >= 0 && number <= 200) {
      return true;
    } else {
      return false;
    }
  }
}

solve([
  "4",
  "Alice 60 100",
  "Bob 40 80",
  "Charlie 70 150",
  "Dave 80 180",
  "Explore - Bob - 60",
  "Refuel - Alice - 30",
  "Breathe - Charlie - 50",
  "Refuel - Dave - 40",
  "Explore - Bob - 40",
  "Breathe - Charlie - 30",
  "Explore - Alice - 40",
  "End",
]);
