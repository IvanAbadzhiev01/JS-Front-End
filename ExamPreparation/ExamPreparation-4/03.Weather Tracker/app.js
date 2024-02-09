const API_URL = `http://localhost:3030/jsonstore/tasks`;

const loadButton = document.querySelector("#load-history");
loadButton.addEventListener("click", loadHistory);
const addWeatherButton = document.querySelector("#add-weather");
addWeatherButton.addEventListener("click", addWeather);
const editWeatherButton = document.querySelector("#edit-weather");
const inputFild = {
  location: document.getElementById("location"),
  temperature: document.getElementById("temperature"),
  date: document.getElementById("date"),
};
editWeatherButton.addEventListener("click", editWeather);
let lastId = "";
async function loadHistory() {
  const respons = await (await fetch(API_URL)).json();

  document.querySelector("#list").innerHTML = "";
  Object.values(respons).forEach((location) => {
    const h2ElementCity = document.createElement("h2");
    h2ElementCity.textContent = location.location;

    const h3ElementDate = document.createElement("h3");
    h3ElementDate.textContent = location.date;

    const h3ElementTemp = document.createElement("h3");
    h3ElementTemp.textContent = location.temperature;
    h3ElementTemp.setAttribute("id", "celsius");

    const changeBtn = document.createElement("button");
    changeBtn.textContent = "Change";
    changeBtn.classList.add("change-btn");
    changeBtn.addEventListener("click", (e) => {
      const content = e.target.parentElement.parentElement;

      const location = content.querySelector(":nth-child(1)").textContent;
      const date = content.querySelector(":nth-child(2)").textContent;
      const temperature = content.querySelector(":nth-child(3)").textContent;

      lastId = content.getAttribute("id");

      inputFild.location.value = location;
      inputFild.date.value = date;
      inputFild.temperature.value = temperature;

      content.remove();
      editWeatherButton.removeAttribute("disabled");
      addWeatherButton.setAttribute("disabled", true);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", async (e) => {
      const id = e.target.parentElement.parentElement.getAttribute("id");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await loadHistory();
    });
    const divButtonContainerElement = document.createElement("div");
    divButtonContainerElement.classList.add("buttons-container");
    divButtonContainerElement.appendChild(changeBtn);
    divButtonContainerElement.appendChild(deleteBtn);

    const divContainerElement = document.createElement("div");
    divContainerElement.classList.add("container");
    divContainerElement.setAttribute("id", `${location._id}`);
    divContainerElement.appendChild(h2ElementCity);
    divContainerElement.appendChild(h3ElementDate);
    divContainerElement.appendChild(h3ElementTemp);
    divContainerElement.appendChild(divButtonContainerElement);

    document.querySelector("#list").appendChild(divContainerElement);
  });
}

async function addWeather() {
  if (Object.values(inputFild).some((selector) => selector.value === "")) {
    return;
  }

  const location = {
    location: inputFild.location.value,
    temperature: inputFild.temperature.value,
    date: inputFild.date.value,
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(location),
  });

  clearInputFild();
  await loadHistory();
}

async function editWeather() {
  const location = inputFild.location.value;
  const temperature = inputFild.temperature.value;
  const date = inputFild.date.value;

  const edit = {
    location,
    temperature,
    date,
    _id: lastId,
  };
  await fetch(`${API_URL}/${lastId}`, {
    method: "PUT",
    body: JSON.stringify(edit),
  });

  await loadHistory();
  clearInputFild();
  editWeatherButton.setAttribute("disabled", true);
  addWeatherButton.removeAttribute("disabled");
}

function clearInputFild() {
  Object.values(inputFild).forEach((inputFild) => (inputFild.value = ""));
}
