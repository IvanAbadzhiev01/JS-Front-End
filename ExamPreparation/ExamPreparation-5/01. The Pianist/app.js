function solve(input) {
  const n = input.shift();

  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(input.shift());
  }

  const sounds = result.reduce((acc, curr) => {
    const [piece, composer, key] = curr.split("|");

    acc[piece] = {
      piece,
      composer,
      key,
    };

    return acc;
  }, {});

  let command = null;

  while ((command = input.shift()) !== "Stop") {
    const commandArgs = command.split("|");
    const commandType = commandArgs[0];
    const piece = commandArgs[1];

    switch (commandType) {
      case "Add":
        const composer = commandArgs[2];
        const key = commandArgs[3];

        let flag = false;
        Object.values(sounds).forEach((sound) => {
          if (sound.piece === piece) {
            flag = true;
          }
        });

        if (flag) {
          console.log(`${piece} is already in the collection!`);
        } else {
          sounds[piece] = {
            piece,
            composer,
            key,
          };

          console.log(
            `${piece} by ${composer} in ${key} added to the collection!`
          );
        }

        break;
      case "Remove":
        let flag2 = false;
        Object.values(sounds).forEach((sound) => {
          if (sound.piece === piece) {
            flag2 = true;
          }
        });

        if (flag2) {
          delete sounds[piece];
          console.log(`Successfully removed ${piece}!`);
        } else {
          console.log(
            `Invalid operation! ${piece} does not exist in the collection.`
          );
        }

        break;
      case "ChangeKey":
        const newKey = commandArgs[2];

        let flag3 = false;
        Object.values(sounds).forEach((sound) => {
          if (sound.piece === piece) {
            flag3 = true;
          }
        });

        if (flag3) {
          sounds[piece].key = newKey;
          console.log(`Changed the key of ${piece} to ${newKey}!`);
        } else {
          console.log(
            `Invalid operation! ${piece} does not exist in the collection.`
          );
        }

        break;
    }
  }
  Object.values(sounds).forEach((sound) => {
    console.log(
      `${sound.piece} -> Composer: ${sound.composer}, Key: ${sound.key}`
    );
  });
}
