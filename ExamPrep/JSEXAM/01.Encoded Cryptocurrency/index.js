function solve(input) {
  let messages = input.shift();

  let command;

  while ((command = input.shift()) != "Buy") {
    const commandLine = command.split("?");
    const commandType = commandLine[0];
    let [action, param1, param2] = command.split("?");
    switch (commandType) {
      case "TakeEven":
        // Take only characters at even indices
        messages = messages
          .split("")
          .filter((_, index) => index % 2 === 0)
          .join("");
        console.log(messages);
        break;
      case "ChangeAll":
        messages = messages.split(param1).join(param2);
        console.log(messages);
        break;

      case "Reverse":
        if (messages.includes(param1)) {
          let reversed = param1.split("").reverse().join("");
          messages = messages.replace(param1, "") + reversed;
          console.log(messages);
        } else {
          console.log("error");
        }
        break;
    }
  }
  console.log(`The cryptocurrency is: ${messages}`);
}

solve([
  "z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
  "TakeEven",
  "Reverse?!nzahc",
  "ChangeAll?m?g",
  "Reverse?adshk",
  "ChangeAll?z?i",
  "Buy",
]);
