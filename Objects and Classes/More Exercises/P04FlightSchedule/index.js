function solve(fligth) {
  const fligtMap = fligth[0].reduce((acc, curr) => {
    const [num, ...destination] = curr.split(" ");
    acc[num] = {
      destination,
      status: null,
    };
    return acc;
  }, {});

  fligth[1].forEach((change) => {
    const [number, status] = change.split(" ");
    if (fligtMap[number]) {
      fligtMap[number].status = fligth[2];
    }
  });

  if (fligth[2] == "Ready to fly") {
    Object.entries(fligtMap).forEach(([number, data]) => {
      if (data.status === null) {
        data.status = "Ready to fly";
        console.log(
          `{ Destination: '${data.destination.join(" ")}', Status: '${
            data.status
          }' }`
        );
      }
    });
  } else {
    Object.entries(fligtMap).forEach(([number, data]) => {
      if (data.status !== null) {
        data.status = "Cancelled";
        console.log(
          `{ Destination: '${data.destination.join(" ")}', Status: '${
            data.status
          }' }`
        );
      }
    });
  }
}
solve([
  [
    "WN269 Delaware",
    "FL2269 Oregon",
    "WN498 Las Vegas",
    "WN3145 Ohio",
    "WN612 Alabama",
    "WN4010 New York",
    "WN1173 California",
    "DL2120 Texas",
    "KL5744 Illinois",
    "WN678 Pennsylvania",
  ],
  [
    "DL2120 Cancelled",
    "WN612 Cancelled",
    "WN1173 Cancelled",
    "SK330 Cancelled",
  ],
  ["Ready to fly"],
]);
