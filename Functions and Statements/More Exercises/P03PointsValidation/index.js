function validityChecker(numbers) {
  const x1 = numbers[0];
  const y1 = numbers[1];
  const x2 = numbers[2];
  const y2 = numbers[3];

  const firstPointDistanceToCenter = Math.sqrt((0 - x1) ** 2 + (0 - y1) ** 2);
  const isFirstDistanceValid = Number.isInteger(firstPointDistanceToCenter);

  const secondPointDistanceToCenter = Math.sqrt((0 - x2) ** 2 + (0 - y2) ** 2);
  const isSecondDistanceValid = Number.isInteger(secondPointDistanceToCenter);

  const distanceBetweenPoint = Math.sqrt((y1 - x1) ** 2 + (y2 - x2) ** 2);
  const isThirdDistanceValid = Number.isInteger(distanceBetweenPoint);

  if (isFirstDistanceValid) {
    console.log(`{${x1}, ${y1}} to {0, 0} is valid`);
  } else {
    console.log(`{${x1}, ${y1}} to {0, 0} is invalid`);
  }

  if (isSecondDistanceValid) {
    console.log(`{${x2}, ${y2}} to {0, 0} is valid`);
  } else {
    console.log(`{${x2}, ${y2}} to {0, 0} is invalid`);
  }
  if (isThirdDistanceValid) {
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
  } else {
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
  }
}

//validityChecker([3, 0, 0, 4]);
