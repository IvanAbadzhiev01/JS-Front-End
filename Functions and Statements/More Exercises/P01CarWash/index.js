function solve(command) {
  let cleaningPercentage = 0;

  const carWasher = {
    soap: (cleaningPercentage) => cleaningPercentage + 10,
    water: (cleaningPercentage) =>
      cleaningPercentage + cleaningPercentage * 0.2,
    "vacuum cleaner": (cleaningPercentage) =>
      cleaningPercentage + cleaningPercentage * 0.25,
    mud: (cleaningPercentage) => cleaningPercentage - cleaningPercentage * 0.1,
  };

  for (let index = 0; index < command.length; index++) {
    const cmd = command[index];
    cleaningPercentage = carWasher[cmd](cleaningPercentage);
  }
  console.log(`The car is ${cleaningPercentage.toFixed(2)}% clean.`);
}

solve(["soap", "soap", "vacuum cleaner", "mud", "soap", "water"]);
