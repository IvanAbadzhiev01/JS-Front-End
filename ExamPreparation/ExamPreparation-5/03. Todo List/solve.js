const API_URL = "http://localhost:3030/jsonstore/tasks";

const buttons = {
  loadAll: document.querySelector("#load-button"),
  add: document.querySelector("#add-button"),
};

buttons.loadAll.addEventListener("click", loadAllTaskInList);

async function loadAllTaskInList() {
  const respons = await (await fetch(API_URL)).json();

  console.log(respons);
}
