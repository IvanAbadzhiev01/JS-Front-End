function addItem() {
  const input = document.querySelector("#newItemText").value;
  const listOfItems = document.querySelector("#items");

  const newElement = document.createElement("li");
  const link = document.createElement("a");

  link.textContent = "[Delete]";
  link.href = "#";
  newElement.textContent = input;

  newElement.appendChild(link);

  link.addEventListener("click", function () {
    link.parentElement.remove();
  });

  listOfItems.appendChild(newElement);

  document.querySelector("#newItemText").value = ``;
}
