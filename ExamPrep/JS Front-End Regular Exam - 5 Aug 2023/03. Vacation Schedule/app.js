const inputSelectors = {
  name: document.querySelector("#name"),
  days: document.querySelector("#num-days"),
  date: document.querySelector("#from-date"),
};

const API_URL = "http://localhost:3030/jsonstore/tasks";
let lastId = "";
const buttonSelectors = {
  load: document.querySelector("#load-vacations"),
  add: document.querySelector("#add-vacation"),
  edit: document.querySelector("#edit-vacation"),
};

buttonSelectors.load.addEventListener("click", loadVacation);
buttonSelectors.add.addEventListener("click", addNewVacation);
buttonSelectors.edit.addEventListener("click", editVacation);
async function loadVacation() {
  const get = await (await fetch(API_URL)).json();

  const parentElement = document.querySelector("#list");
  parentElement.innerHTML = "";

  Object.values(get).forEach((vacantion) => {
    const divContainer = createElement(
      "div",
      null,
      ["container"],
      vacantion._id
    );

    createElement("h2", vacantion.name, [], null, divContainer);
    createElement("h3", vacantion.date, [], null, divContainer);
    createElement("h3", vacantion.days, [], null, divContainer);
    const change = createElement("button", "Change", ["change-btn"]);
    change.addEventListener("click", (e) => {
      const liElement = e.target.parentElement;

      const name = liElement.querySelector(":nth-child(1)").textContent;
      const days = liElement.querySelector(":nth-child(3)").textContent;
      const date = liElement.querySelector(":nth-child(2)").textContent;
      const _id = liElement.getAttribute("id");

      console.log(name);
      console.log(days);
      console.log(date);
      console.log(_id);
      inputSelectors.name.value = name;
      inputSelectors.days.value = days;
      inputSelectors.date.value = date;
      lastId = _id;

      liElement.remove();
      buttonSelectors.edit.removeAttribute("disabled");
      buttonSelectors.add.setAttribute("disabled", true);
    });
    divContainer.appendChild(change);
    const done = createElement("button", "Done", ["done-btn"]);
    done.addEventListener("click", async (e) => {
      const id = e.target.parentElement.getAttribute("id");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await loadVacation();
    });
    divContainer.appendChild(done);

    parentElement.appendChild(divContainer);
  });

  console.log(get);
}

async function addNewVacation(e) {
  if (Object.values(inputSelectors).some((selector) => selector.value === "")) {
    return;
  }

  const newVacation = {
    name: inputSelectors.name.value,
    days: inputSelectors.days.value,
    date: inputSelectors.date.value,
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newVacation),
  });

  await loadVacation();

  clearInputFild();
}

async function editVacation(e) {
  e.preventDefault();

  const editData = {
    name: inputSelectors.name.value,
    days: inputSelectors.days.value,
    date: inputSelectors.date.value,
    _id: lastId,
  };

  await fetch(`${API_URL}/${lastId}`, {
    method: "PUT",
    body: JSON.stringify(editData),
  });

  await loadVacation();
  buttonSelectors.edit.setAttribute("disabled", true);
  buttonSelectors.add.removeAttribute("disabled");
  clearInputFild();
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
