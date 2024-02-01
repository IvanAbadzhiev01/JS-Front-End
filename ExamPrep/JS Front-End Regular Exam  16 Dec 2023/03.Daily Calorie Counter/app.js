const API_URL = "http://localhost:3030/jsonstore/tasks";
let lastId;
const inputSelectors = {
  food: document.querySelector("#food"),
  time: document.querySelector("#time"),
  calories: document.querySelector("#calories"),
};

const buttons = {
  add: document.querySelector("#add-meal"),
  edit: document.querySelector("#edit-meal"),
  load: document.querySelector("#load-meals"),
};

buttons.load.addEventListener("click", loadDate);
buttons.add.addEventListener("click", addNewMeal);
buttons.edit.addEventListener("click", editMeal);
async function loadDate() {
  const respons = await (await fetch(API_URL)).json();
  //console.log(JSON.stringify(respons, null, 4));
  const parentElement = document.querySelector("#list");
  parentElement.innerHTML = "";
  Object.values(respons).forEach((meal) => {
    const divElement = createElement("div", null, ["meal"], meal._id);

    createElement("h2", meal.food, [], null, divElement);
    createElement("h3", meal.time, [], null, divElement);
    createElement("h3", meal.calories, [], null, divElement);

    const divElementBTN = createElement("div", null, [], "meal-buttons");

    const change = createElement("button", "Change", ["change-meal"]);
    change.addEventListener("click", async (e) => {
      const parentElement = e.target.parentElement.parentElement;

      inputSelectors.food.value =
        parentElement.querySelector(":nth-child(1)").textContent;
      inputSelectors.time.value =
        parentElement.querySelector(":nth-child(2)").textContent;
      inputSelectors.calories.value =
        parentElement.querySelector(":nth-child(3)").textContent;
      lastId = parentElement.getAttribute("id");

      parentElement.remove();

      buttons.add.setAttribute("disabled", true);
      buttons.edit.removeAttribute("disabled");
    });

    const deleteb = createElement("button", "Delete", ["delete-meal"]);

    divElementBTN.appendChild(change);
    divElementBTN.appendChild(deleteb);

    divElement.appendChild(divElementBTN);
    parentElement.appendChild(divElement);
  });
}

async function addNewMeal() {
  if (Object.values(inputSelectors).some((selector) => selector.value === "")) {
    return;
  }

  const food = inputSelectors.food.value;
  const time = inputSelectors.time.value;
  const calories = inputSelectors.calories.value;

  const newMeal = {
    food,
    time,
    calories,
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newMeal),
  });

  clearInputFild();
  await loadDate();
}

await function editMeal(){
    const updateData = {
        food: inputSelectors.food.value,
        time: inputSelectors.time.value,
        calories: inputSelectors.calories.value,
        _id: lastId,
      };
}

function createElement(type, content, classes, id, parent) {
  const element = document.createElement(type);

  if (content) {
    element.textContent = content;
  }
  if (classes && classes.length > 0) {
    element.classList.add(...classes);
  }
  if (id) {
    element.setAttribute("id", id);
  }
  if (parent) {
    parent.appendChild(element);
  }

  return element;
}
function clearInputFild() {
  Object.values(inputSelectors).forEach((inputFild) => (inputFild.value = ""));
}
