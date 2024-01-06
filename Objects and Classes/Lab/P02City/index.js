function solve(city) {
  Object.entries(city).forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
  });
}
const city = {
  name: "Plovdiv",
  area: 389,
  population: 1162358,
  country: "Bulgaria",
  postCode: "4000",
};

solve(city);
