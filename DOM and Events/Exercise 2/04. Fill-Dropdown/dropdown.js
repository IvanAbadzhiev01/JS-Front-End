function addItem() {
  const newText = document.querySelector("#newItemText");
  const newValue = document.querySelector("#newItemValue");

  const option = document.createElement("option");
  option.textContent = newText.value;
  option.setAttribute("value", newValue.value);

  const dropdown = document.querySelector("#menu");
  dropdown.appendChild(option);

  newText.value = "";
  newValue.value = "";
}
