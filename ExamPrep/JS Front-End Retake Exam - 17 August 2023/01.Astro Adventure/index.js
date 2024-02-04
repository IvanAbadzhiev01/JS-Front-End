function solve(input) {
  const n = input.shift();

  const astro = [];

  for (let i = 0; i < n; i++) {
    astro.push(input.shift());
  }

  const astroAsObj = astro.reduce((acc, curr) => {
    const [astronautName, oxygenLevel, energyReserves] = curr.split(" ");
    if (Number(oxygenLevel) > 100) {
      oxygenLevel = "100";
    }

    if (Number(oxygenLevel) < 0) {
      oxygenLevel = "0";
    }
    if (Number(energyReserves) > 200) {
      energyReserves = "200";
    }
    if (Number(energyReserves) < 0) {
      energyReserves = "0";
    }

    acc[astronautName] = {
      astronautName,
      oxygenLevel: Number(oxygenLevel),
      energyReserves: Number(energyReserves),
    };

    return acc;
  }, {});

  let commandLine = "";

  while ((commandLine = input.shift()) != "End") {
    const commandArgs = commandLine.split(" - ");
    const commandType = commandArgs[0];
    const name = commandArgs[1];
    let amount = Number(commandArgs[2]);

    switch (commandType) {
      case "Explore":
        if (astroAsObj[name].energyReserves >= amount) {
          astroAsObj[name].energyReserves -= amount;
          console.log(
            `${name} has successfully explored a new area and now has ${astroAsObj[name].energyReserves} energy!`
          );
        } else {
          console.log(`${name} does not have enough energy to explore!`);
        }
        break;
      case "Refuel":
        if (astroAsObj[name].energyReserves + amount > 200) {
          const over2 = astroAsObj[name].energyReserves + amount - 200;

          amount -= over2;

          astroAsObj[name].energyReserves += amount;

          console.log(`${name} refueled their energy by ${amount}!`);
          break;
        }

        astroAsObj[name].energyReserves += amount;
        console.log(`${name} refueled their energy by ${amount}!`);

        break;
      case "Breathe":
        if (astroAsObj[name].oxygenLevel + amount > 100) {
          const over2 = astroAsObj[name].oxygenLevel + amount - 100;

          amount -= over2;

          astroAsObj[name].oxygenLevel += amount;

          console.log(`${name} took a breath and recovered ${amount} oxygen!`);
          break;
        }

        astroAsObj[name].oxygenLevel += amount;
        console.log(`${name} took a breath and recovered ${amount} oxygen!`);

        break;
    }
  }

  Object.values(astroAsObj).forEach((as) =>
    console.log(
      `Astronaut: ${as.astronautName}, Oxygen: ${as.oxygenLevel}, Energy: ${as.energyReserves}`
    )
  );
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
