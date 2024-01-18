function getInfo() {
  const busStopID = document.querySelector("#stopId").value;

  fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopID}`)
    .then((res) => res.json())
    .then((busStop) => {
      document.querySelector("#stopName").textContent = busStop.name;

      loadData();
    })
    .catch(() => {
      document.querySelector("#stopName").textContent = "Error";
    });
}

function loadData() {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  Object.entries(busStop.buses).map(([busNumber, timeMinutes]) => {
    const item = document.createElement("li");
    item.textContent = `Bus ${busNumber} arrives in ${timeMinutes} minutes`;
    list.appendChild(item);
  });
}
