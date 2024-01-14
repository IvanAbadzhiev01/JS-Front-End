function addItem() {
  const input = document.querySelector("#newItemText").value;
  const listOfItems = document.querySelector("#items");
  const newElement = document.createElement("li");
  newElement.textContent = input;
  listOfItems.appendChild(newElement);
  document.querySelector("#newItemText").value = ``;
}
