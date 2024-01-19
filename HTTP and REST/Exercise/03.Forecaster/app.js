function attachEvents() {
  document
    .querySelector("#submit")
    .addEventListener("click", getWeatherDateForLocation);
}

const weatherSymbols = {
  Sunny: "☀",
  "Partly sunny": "⛅",
  Overcast: "☁",
  Rain: "☂",
};

async function getWeatherDateForLocation() {
  const locationName = document.querySelector("#location").value;
  const locationResponse = await (
    await fetch("http://localhost:3030/jsonstore/forecaster/locations")
  ).json();

  const location = locationResponse.find(
    (l) => l.name.toLowerCase() === locationName.toLowerCase()
  );

  const [currentConditions, upcomingWeather] = await Promise.all([
    getCurrentConditions(location.code),
    getUpcomigWeather(location.code),
  ]);

  document.querySelector("#forecast").style.display = "block";

  const dataHolder = createForecastDataContainer(currentConditions);

  document
    .querySelector("#current")
    .appendChild(createCurrentWeatherContainer(currentConditions));

  document
    .querySelector("#upcoming")
    .appendChild(createUpcomingWeatherContainer(upcomingWeather));
}

async function getCurrentConditions(code) {
  const currentConditionsResponse = await (
    await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
  ).json();

  return currentConditionsResponse;
}

async function getUpcomigWeather(code) {
  const threedDayForcastResponse = await (
    await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
  ).json();
  return threedDayForcastResponse;
}

function createUpcomingWeatherContainer(forecast) {
  const upcomingForecastContainer = document.createElement("div");
  upcomingForecastContainer.classList.add("fotrcast-info");

  forecast.forecast.forEach((data) => {
    const element = document.createElement("div");
    element.classList.add(`upcoming`);
    element.appendChild(
      createForcastElement(weatherSymbols[data.condition]),
      "symbol"
    );
    element.appendChild(
      createForcastElement(
        `${data.low}°/
  ${data.high}°`,
        "forecast-data"
      )
    );
    element.appendChild(createForcastElement(data.condition, "forecast-data"));
    upcomingForecastContainer.appendChild(element);
  });
  return upcomingForecastContainer;
}
function createCurrentWeatherContainer(forecast) {
  const currentWeathercontainer = document.createElement("div");
  currentWeathercontainer.classList.add("forecast");

  currentWeathercontainer.appendChild(
    createForcastElement(
      weatherSymbols[forecast.forecast.condition],
      "condition",
      "symbol"
    )
  );

  currentWeathercontainer.appendChild(createForecastDataContainer(forecast));

  return currentWeathercontainer;
}
function createForecastDataContainer(forecast) {
  const dataHolder = document.createElement("span");
  dataHolder.classList.add("condition");

  dataHolder.appendChild(createForcastElement(forecast.name, "forecast-data"));
  dataHolder.appendChild(
    createForcastElement(
      `${forecast.forecast.low}°/
  ${forecast.forecast.high}°`,
      "forecast-data"
    )
  );

  dataHolder.appendChild(
    createForcastElement(forecast.forecast.condition, "forecast-data")
  );
  return dataHolder;
}
function createForcastElement(textContent, ...classes) {
  const forecastElement = document.createElement("span");
  forecastElement.textContent = textContent;
  forecastElement.classList.add(...classes);

  return forecastElement;
}

attachEvents();
