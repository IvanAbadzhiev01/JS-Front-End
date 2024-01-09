function solve(input) {
  const product = input.reduce((acc, curr) => {
    const [name, price] = curr.split(" : ");

    const letter = name[0];

    if (!acc[letter]) {
      acc[letter] = [];
    }

    acc[letter].push({ name, price });
    return acc;
  }, {});

  Object.keys(product)
    .sort()
    .forEach((letter) => {
      console.log(letter);
      product[letter]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((prod) => {
          console.log(`  ${prod.name}: ${prod.price}`);
        });
    });
}
solve([
  "Appricot : 20.4",
  "Fridge : 1500",
  "TV : 1499",
  "Deodorant : 10",
  "Boiler : 300",
  "Apple : 1.25",
  "Anti-Bug Spray : 15",
  "T-Shirt : 10",
]);
