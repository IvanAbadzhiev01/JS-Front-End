const API_URL = "http://localhost:3030/jsonstore/tasks";
let lastId = "";
const inputFild = {
  name: document.querySelector("#name"),
  days: document.querySelector("#num-days"),
  date: document.querySelector("#from-date"),
};

const buttons = {
  add: document.querySelector("#add-vacation"),
  edit: document.querySelector("#edit-vacation"),
  load: document.querySelector("#load-vacations"),
};

buttons.load.addEventListener("click", loadVacation);
buttons.add.addEventListener("click", addVacation);
buttons.edit.addEventListener("click", editVacation);

async function loadVacation() {
  const respons = await (await fetch(API_URL)).json();

  document.querySelector("#list").innerHTML = "";
  Object.values(respons).forEach((vacation) => {
    const divElement = createElement("div", null, ["container"], vacation._id);
    const h2Element = createElement("h2", vacation.name, [], null, divElement);
    const h3ElementDate = createElement(
      "h3",
      vacation.date,
      [],
      null,
      divElement
    );
    const h3ElementDays = createElement(
      "h3",
      vacation.days,
      [],
      null,
      divElement
    );
    const changeBtn = createElement(
      "button",
      "Change",
      ["change-btn"],
      null,
      divElement
    );
    changeBtn.addEventListener("click", (e) => {
      const liElement = e.target.parentElement;

      const name = liElement.querySelector(":nth-child(1)").textContent;
      const days = liElement.querySelector(":nth-child(3)").textContent;
      const date = liElement.querySelector(":nth-child(2)").textContent;
      const _id = liElement.getAttribute("id");

      console.log(name);
      console.log(days);
      console.log(date);
      console.log(_id);
      inputFild.name.value = name;
      inputFild.days.value = days;
      inputFild.date.value = date;
      lastId = _id;

      liElement.remove();
      buttons.edit.removeAttribute("disabled");
      buttons.add.setAttribute("disabled", true);
    });

    const doneBtn = createElement(
      "button",
      "Done",
      ["done-btn"],
      null,
      divElement
    );
    doneBtn.addEventListener("click", async (e) => {
      const liElement = e.target.parentElement;
      lastId = liElement.getAttribute("id");
      await fetch(`${API_URL}/${lastId}`, {
        method: "DELETE",
      });
      await loadVacation();
    });
    document.querySelector("#list").appendChild(divElement);
  });
}

async function addVacation(e) {
  // e.preventDefault();
  if (Object.values(inputFild).some((selector) => selector.value === "")) {
    return;
  }

  const name = inputFild.name.value;
  const days = inputFild.days.value;
  const date = inputFild.date.value;

  const newVacation = {
    name,
    days,
    date,
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
  const name = inputFild.name.value;
  const days = inputFild.days.value;
  const date = inputFild.date.value;
  const _id = lastId;

  console.log();

  const updateVacation = {
    name,
    days,
    date,
    _id,
  };

  await fetch(`${API_URL}/${_id}`, {
    method: "PUT",
    body: JSON.stringify(updateVacation),
  });

  await loadVacation();
  clearInputFild();
}

function clearInputFild() {
  Object.values(inputFild).forEach((inputFild) => (inputFild.value = ""));
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
