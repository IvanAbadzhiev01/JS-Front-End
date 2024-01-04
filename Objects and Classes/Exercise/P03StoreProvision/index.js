function solve(arr, arr2) {
  const product = [...arr, ...arr2];
  const stock = product.reduce((acc, curr, i) => {
    if (i % 2 === 0) {
      //product
      if (!acc.hasOwnProperty(curr)) {
        acc[curr] = Number(product[i + 1]);
      } else {
        acc[curr] += Number(product[i + 1]);
      }
    }

    return acc;
  }, {});
  Object.keys(stock).forEach((key) => {
    console.log(`${key} -> ${stock[key]}`);
  });
}
solve(
  ["Chips", "5", "CocaCola", "9", "Bananas", "14", "Pasta", "4", "Beer", "2"],
  ["Flour", "44", "Oil", "12", "Pasta", "7", "Tomatoes", "70", "Bananas", "30"]
);
