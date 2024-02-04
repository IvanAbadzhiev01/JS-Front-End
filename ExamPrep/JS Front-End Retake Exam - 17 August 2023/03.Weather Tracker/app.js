const API_URL = `http://localhost:3030/jsonstore/tasks`;
let lastId = "";
const inputSelector = {
  location: document.querySelector("#location"),
  temperature: document.querySelector("#temperature"),
  date: document.querySelector("#date"),
};

const buttonSelector = {
  load: document.querySelector("#load-history"),
  add: document.querySelector("#add-weather"),
  //add: document.querySelector("#add-weather")
  edit: document.querySelector("#edit-weather"),
};

buttonSelector.load.addEventListener("click", loadWeather);
buttonSelector.add.addEventListener("click", addNewCity);
buttonSelector.edit.addEventListener("click", editData);
async function loadWeather() {
  const response = await (await fetch(API_URL)).json();

  const parentElementDiv = document.querySelector("#list");
  parentElementDiv.innerHTML = "";

  Object.values(response).forEach((sity) => {
    console.log(sity);

    const containerElement = createElement(
      "div",
      null,
      ["container"],
      sity._id
    );

    createElement("h2", sity.location, [], null, containerElement);
    createElement("h3", sity.date, [], null, containerElement);
    createElement("h3", sity.temperature, [], "celsius", containerElement);

    const buttonDivElement = createElement("div", null, ["buttons-container"]);
    const change = createElement("button", "Change", ["change-btn"]);
    change.addEventListener("click", (e) => {
      const container = e.target.parentElement.parentElement;

      const location = container.querySelector(":nth-child(1)").textContent;
      const temperature = container.querySelector(":nth-child(3)").textContent;
      const date = container.querySelector(":nth-child(2)").textContent;
      const _id = container.getAttribute("id");

      inputSelector.location.value = location;
      inputSelector.temperature.value = temperature;
      inputSelector.date.value = date;
      lastId = _id;

      container.remove();

      buttonSelector.add.setAttribute("disabled", true);
      buttonSelector.edit.removeAttribute("disabled");
    });

    const delet = createElement("button", "Delete", ["delete-btn"]);
    delet.addEventListener("click", async (e) => {
      const id = e.target.parentElement.parentElement.getAttribute("id");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      await loadWeather();
    });
    buttonDivElement.appendChild(change);
    buttonDivElement.appendChild(delet);
    containerElement.appendChild(buttonDivElement);
    parentElementDiv.appendChild(containerElement);
  });
}

async function addNewCity() {
  if (Object.values(inputSelector).some((selector) => selector.value === "")) {
    return;
  }

  const location = inputSelector.location.value;
  const temperature = inputSelector.temperature.value;
  const date = inputSelector.date.value;

  const newCity = {
    location,
    temperature,
    date,
  };
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newCity),
  });
  await loadWeather();
  clearInputFild();
}

async function editData() {
  const location = inputSelector.location.value;
  const temperature = inputSelector.temperature.value;
  const date = inputSelector.date.value;
  const _id = lastId;

  const newData = {
    location,
    temperature,
    date,
    _id,
  };

  await fetch(`${API_URL}/${lastId}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
  buttonSelector.add.removeAttribute("disabled");
  buttonSelector.edit.setAttribute("disabled", true);

  await loadWeather();
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
  Object.values(inputSelector).forEach((inputFild) => (inputFild.value = ""));
}
