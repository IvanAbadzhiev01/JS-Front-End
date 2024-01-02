function modificationNumber(number) {
  number = number.toString();
  let sum =
    number
      .split("")
      .map(Number)
      .reduce((total, curr) => total + curr, 0) / number.length;

  while (sum < 5) {
    number += "9";
    sum =
      number
        .split("")
        .map(Number)
        .reduce((total, curr) => total + curr, 0) / number.length;
  }

  return number;
}

console.log(modificationNumber(101));
