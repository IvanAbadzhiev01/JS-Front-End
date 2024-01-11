function solve() {
  const button = document.querySelector("#exercise button");
  const bayButton = document.querySelector("#exercise button:nth-of-type(2)");

  bayButton.addEventListener("click", baySelectItem);
  button.addEventListener("click", parseFurnitureInput);

  Array.from(document.querySelectorAll("input[type=checkbox]")).forEach((c) =>
    c.removeAttribute("disabled")
  );
  function parseFurnitureInput() {
    const input = JSON.parse(
      document.querySelector("#exercise textarea").value
    );

    const tableBody = document.querySelector("tbody");
    input
      .map((furniture) => {
        const row = document.createElement("tr");

        const imageCell = document.createElement("td");
        const image = document.createElement("img");
        image.src = furniture.img;
        imageCell.appendChild(image);

        const nameCell = document.createElement("td");
        nameCell.textContent = furniture.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = furniture.price;

        const decFacCell = document.createElement("td");
        decFacCell.textContent = furniture.decFactor;

        const checkCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkCell.appendChild(checkbox);
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(decFacCell);
        row.append(checkCell);

        return row;
      })
      .forEach((row) => tableBody.appendChild(row));
  }
  function baySelectItem() {
    const checkBoxes = Array.from(
      document.querySelectorAll("input[type=checkbox]:checked")
    );
    const card = checkBoxes
      .map((checkbox) => {
        const row = checkbox.parentElement.parentElement;
        const name = row.querySelector("td:nth-of-type(2)").innerText;
        const price = row.querySelector("td:nth-of-type(3)").innerText;
        const decFactor = row.querySelector("td:nth-of-type(4)").innerText;

        return { name, price, decFactor };
      })
      .reduce(
        (acc, curr) => {
          acc.names.push(curr.name);
          acc.price += Number(curr.price);
          acc.averageDecorationFactor += Number(curr.decFactor);
          return acc;
        },
        {
          names: [],
          price: 0,
          averageDecorationFactor: 0,
        }
      );

    card.averageDecorationFactor =
      card.averageDecorationFactor / card.names.length;
    const cardTextArea = document.querySelector(
      `#exercise textarea:nth-of-type(2)`
    );

    cardTextArea.value = `Bought furniture: ${card.names.join(", ")}
    Total price: ${card.price.toFixed(2)}
    Avg Dec Factor: ${card.averageDecorationFactor.toFixed(2)}`;
  }
}
