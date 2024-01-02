function solve(command) {
  const target = command[0];
  const cryst = command.splice(1);
  for (let i = 0; i < cryst.length; i++) {
    let crystals = cryst[i];

    while (crystals > target) {
      console.log(`Processing chunk ${crystals} microns`);
      if (crystals / 4 >= target) {
        let counter = 0;

        while (crystals / 4 >= target) {
          crystals = crystals / 4;
          counter++;
        }
        crystals = Math.floor(crystals);
        console.log(`Cut x${counter}`);
        console.log(`Transporting and washing`);
      }

      if (crystals - crystals * 0.2 >= target) {
        let counter = 0;

        while (crystals - crystals * 0.2 >= target) {
          crystals -= crystals * 0.2;
          counter++;
        }
        crystals = Math.floor(crystals);
        console.log(`Lap x${counter}`);
        console.log(`Transporting and washing`);
      }
      if (crystals - 20 >= target) {
        let counter = 0;

        while (crystals - 20 >= target) {
          crystals -= 20;
          counter++;
        }
        crystals = Math.floor(crystals);
        console.log(`Grind x${counter}`);
        console.log(`Transporting and washing`);
      }

      if (crystals - 2 >= target - 1) {
        let counter = 0;

        while (crystals - 2 >= target - 1) {
          crystals -= 2;
          counter++;
        }
        crystals = Math.floor(crystals);
        console.log(`Etch x${counter}`);
        console.log(`Transporting and washing`);
      }
    }

    if (crystals + 1 === target) {
      crystals += 1;
      console.log(`X-ray x1`);
    }
    console.log(`Finished crystal ${crystals} microns`);
  }
}
