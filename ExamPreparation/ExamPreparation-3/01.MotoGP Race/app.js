function solve(input) {
  const n = input.shift();

  const inputDate = [];
  for (let i = 0; i < n; i++) {
    inputDate.push(input.shift());
  }

  const riders = inputDate.reduce((acc, curr) => {
    const [rider, fuelCapacity, position] = curr.split("|");
    if (Number(fuelCapacity) > 100) {
      fuelCapacity = "100";
    }
    if (Number(fuelCapacity) < 0) {
      fuelCapacity = "100";
    }
    if (Object.values(acc).some((rid) => rid.position === Number(position))) {
    }
    acc[rider] = {
      rider,
      fuelCapacity: Number(fuelCapacity),
      position: Number(position),
    };

    return acc;
  }, {});

  let command = null;
  while ((command = input.shift()) !== "Finish") {
    const commandArgs = command.split(" - ");
    const commandType = commandArgs[0];
    const rider = commandArgs[1];

    switch (commandType) {
      case "StopForFuel":
        const minimutFuel = commandArgs[2];
        const changePosition = commandArgs[3];

        if (riders[rider].fuelCapacity >= minimutFuel) {
          console.log(`${rider} does not need to stop for fuel!`);
          break;
        }

        riders[rider].position = changePosition;
        riders[rider].fuelCapacity = 100;

        console.log(
          `${rider} stopped to refuel but lost his position, now he is ${changePosition}.`
        );
        break;
      case "Overtaking":
        const riderTwo = commandArgs[2];

        const riderOnePosition = riders[rider].position;
        const riderTwoPosition = riders[riderTwo].position;

        const diff = riderOnePosition - riderTwoPosition;

        if (diff === 1) {
          riders[rider].position = riderTwoPosition;
          riders[riderTwo].position = riderOnePosition;
          console.log(`${rider} overtook ${riderTwo}!`);
        }
        if (diff === -1) {
          riders[rider].position = riderTwoPosition;
          riders[riderTwo].position = riderOnePosition;
          console.log(`${rider} overtook ${riderTwo}!`);
        }

        break;
      case "EngineFail":
        const lapsLeft = commandArgs[2];

        delete riders[rider];
        console.log(
          `${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`
        );
        break;
    }
  }

  Object.values(riders).forEach((rider) => {
    console.log(`${rider.rider}`);
    console.log(`  Final position: ${rider.position}`);
  });
}
