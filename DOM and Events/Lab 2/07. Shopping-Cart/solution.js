function solve() {
  const but = Array.from(document.querySelectorAll(".add-product"));

  const card = document.querySelector("textarea");

  const product = [];
  let sum = 0;
  but.forEach((b) => {
    const name =
      b.parentElement.parentElement.querySelector(".product-title").textContent;
    const price = Number(
      b.parentElement.parentElement.querySelector(".product-line-price")
        .textContent
    );

    b.addEventListener("click", (e) => {
      card.textContent += `Added ${name} for ${price.toFixed(
        2
      )} to the cart.\n`;
      if (!product.includes(name)) {
        product.push(name);
      }
      sum += price;
    });
  });

  const chek = document.querySelector(".checkout");
  chek.addEventListener("click", (e) => {
    card.textContent += `You bought ${product.join(", ")} for ${sum.toFixed(
      2
    )}.`;
    const b = Array.from(document.querySelectorAll("button"));
    b.forEach((d) => (d.disabled = true));
  });
}
