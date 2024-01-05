function solve(input) {
  const parkDatabase = new Set();
  input.forEach((line) => {
    const [type, number] = line.split(", ");

    if (type === "IN") {
      parkDatabase.add(number);
    } else if (type === "OUT") {
      parkDatabase.delete(number);
    }
  });

  if (parkDatabase.length === 0) {
    console.log("Parking Lot is Empty");
    return;
  }

  const sortedArray = Array.from(parkDatabase).sort();

  sortedArray.forEach((line) => console.log(line));
}
solve([
  "IN, CA2844AA",
  "IN, CA1234TA",
  "OUT, CA2844AA",
  "IN, CA9999TT",
  "IN, CA2866HI",
  "OUT, CA1234TA",
  "IN, CA2844AA",
  "OUT, CA2866HI",
  "IN, CA9876HH",
  "IN, CA2822UU",
]);
